import config from 'app/core/config';
import coreModule from 'app/core/core_module';

export class PrefsControlCtrl {
  prefs: any;
  oldTheme: any;
  prefsForm: any;
  mode: string;

  timezones: any = [
    { value: '', text: '默认' },
    { value: 'browser', text: '本地浏览器时间' },
    { value: 'utc', text: 'UTC' },
  ];
  themes: any = [{ value: '', text: '默认' }, { value: 'dark', text: 'Dark' }, { value: 'light', text: 'Light' }];

  /** @ngInject **/
  constructor(private backendSrv, private $location) {}

  $onInit() {
    return this.backendSrv.get(`/api/${this.mode}/preferences`).then(prefs => {
      this.prefs = prefs;
      this.oldTheme = prefs.theme;
    });
  }

  updatePrefs() {
    if (!this.prefsForm.$valid) {
      return;
    }

    var cmd = {
      theme: this.prefs.theme,
      timezone: this.prefs.timezone,
      homeDashboardId: this.prefs.homeDashboardId,
    };

    this.backendSrv.put(`/api/${this.mode}/preferences`, cmd).then(() => {
      window.location.href = config.appSubUrl + this.$location.path();
    });
  }
}

var template = `
<form name="ctrl.prefsForm" class="section gf-form-group">
  <h3 class="page-heading">偏好设置</h3>

  <div class="gf-form">
    <span class="gf-form-label width-11">UI主题</span>
    <div class="gf-form-select-wrapper max-width-20">
      <select class="gf-form-input" ng-model="ctrl.prefs.theme" ng-options="f.value as f.text for f in ctrl.themes"></select>
    </div>
  </div>

  <div class="gf-form">
    <span class="gf-form-label width-11">
      主页仪表板
      <info-popover mode="right-normal">
        没有找到你想要的仪表盘？ 首先收藏它，然后它会出现在这个选择框中。
      </info-popover>
    </span>
    <dashboard-selector class="gf-form-select-wrapper max-width-20" model="ctrl.prefs.homeDashboardId">
    </dashboard-selector>
  </div>

  <div class="gf-form">
    <label class="gf-form-label width-11">时区</label>
    <div class="gf-form-select-wrapper max-width-20">
      <select class="gf-form-input" ng-model="ctrl.prefs.timezone" ng-options="f.value as f.text for f in ctrl.timezones"></select>
    </div>
  </div>

  <div class="gf-form-button-row">
    <button type="submit" class="btn btn-success" ng-click="ctrl.updatePrefs()">保存</button>
  </div>
</form>
`;

export function prefsControlDirective() {
  return {
    restrict: 'E',
    controller: PrefsControlCtrl,
    bindToController: true,
    controllerAs: 'ctrl',
    template: template,
    scope: {
      mode: '@',
    },
  };
}

coreModule.directive('prefsControl', prefsControlDirective);
