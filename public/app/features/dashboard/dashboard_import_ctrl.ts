import _ from 'lodash';
import config from 'app/core/config';

export class DashboardImportCtrl {
  navModel: any;
  step: number;
  jsonText: string;
  parseError: string;
  nameExists: boolean;
  dash: any;
  inputs: any[];
  inputsValid: boolean;
  gnetUrl: string;
  gnetError: string;
  gnetInfo: any;
  titleTouched: boolean;
  hasNameValidationError: boolean;
  nameValidationError: any;

  /** @ngInject */
  constructor(private backendSrv, private validationSrv, navModelSrv, private $location, $routeParams) {
    this.navModel = navModelSrv.getNav('create', 'import');

    this.step = 1;
    this.nameExists = false;

    // check gnetId in url
    if ($routeParams.gnetId) {
      this.gnetUrl = $routeParams.gnetId;
      this.checkGnetDashboard();
    }
  }

  onUpload(dash) {
    this.dash = dash;
    this.dash.id = null;
    this.step = 2;
    this.inputs = [];

    if (this.dash.__inputs) {
      for (let input of this.dash.__inputs) {
        var inputModel = {
          name: input.name,
          label: input.label,
          info: input.description,
          value: input.value,
          type: input.type,
          pluginId: input.pluginId,
          options: [],
        };

        if (input.type === 'datasource') {
          this.setDatasourceOptions(input, inputModel);
        } else if (!inputModel.info) {
          inputModel.info = '指定一个字符串';
        }

        this.inputs.push(inputModel);
      }
    }

    this.inputsValid = this.inputs.length === 0;
    this.titleChanged();
  }

  setDatasourceOptions(input, inputModel) {
    var sources = _.filter(config.datasources, val => {
      return val.type === input.pluginId;
    });

    if (sources.length === 0) {
      inputModel.info = '没有找到' + input.pluginName + ' 类型的数据源';
    } else if (!inputModel.info) {
      inputModel.info = '选择一个 ' + input.pluginName + ' 数据源';
    }

    inputModel.options = sources.map(val => {
      return { text: val.name, value: val.name };
    });
  }

  inputValueChanged() {
    this.inputsValid = true;
    for (let input of this.inputs) {
      if (!input.value) {
        this.inputsValid = false;
      }
    }
  }

  titleChanged() {
    this.titleTouched = true;
    this.nameExists = false;

    this.validationSrv
      .validateNewDashboardName(0, this.dash.title)
      .then(() => {
        this.hasNameValidationError = false;
      })
      .catch(err => {
        if (err.type === 'EXISTING') {
          this.nameExists = true;
        }

        this.hasNameValidationError = true;
        this.nameValidationError = err.message;
      });
  }

  saveDashboard() {
    var inputs = this.inputs.map(input => {
      return {
        name: input.name,
        type: input.type,
        pluginId: input.pluginId,
        value: input.value,
      };
    });

    return this.backendSrv
      .post('api/dashboards/import', {
        dashboard: this.dash,
        overwrite: true,
        inputs: inputs,
      })
      .then(res => {
        this.$location.url(res.importedUrl);
      });
  }

  loadJsonText() {
    try {
      this.parseError = '';
      var dash = JSON.parse(this.jsonText);
      this.onUpload(dash);
    } catch (err) {
      console.log(err);
      this.parseError = err.message;
      return;
    }
  }

  checkGnetDashboard() {
    this.gnetError = '';

    var match = /(^\d+$)|dashboards\/(\d+)/.exec(this.gnetUrl);
    var dashboardId;

    if (match && match[1]) {
      dashboardId = match[1];
    } else if (match && match[2]) {
      dashboardId = match[2];
    } else {
      this.gnetError = 'Could not find dashboard';
    }

    return this.backendSrv
      .get('api/gnet/dashboards/' + dashboardId)
      .then(res => {
        this.gnetInfo = res;
        // store reference to grafana.com
        res.json.gnetId = res.id;
        this.onUpload(res.json);
      })
      .catch(err => {
        err.isHandled = true;
        this.gnetError = err.data.message || err;
      });
  }

  back() {
    this.gnetUrl = '';
    this.step = 1;
    this.gnetError = '';
    this.gnetInfo = '';
  }
}
