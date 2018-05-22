import coreModule from 'app/core/core_module';

const hitTypes = {
  FOLDER: 'dash-folder',
  DASHBOARD: 'dash-db',
};

export class ValidationSrv {
  rootName = 'general';

  /** @ngInject */
  constructor(private $q, private backendSrv) {}

  validateNewDashboardName(folderId, name) {
    return this.validate(folderId, name, '此文件夹中已经存在相同名称的仪表板');
  }

  validateNewFolderName(name) {
    return this.validate(0, name, '通用文件夹中已存在相同名称的文件夹或仪表板');
  }

  private validate(folderId, name, existingErrorMessage) {
    name = (name || '').trim();
    const nameLowerCased = name.toLowerCase();

    if (name.length === 0) {
      return this.$q.reject({
        type: 'REQUIRED',
        message: 'Name is required',
      });
    }

    if (folderId === 0 && nameLowerCased === this.rootName) {
      return this.$q.reject({
        type: 'EXISTING',
        message: '这是一个保留名称，不能用于文件夹.',
      });
    }

    let deferred = this.$q.defer();

    const promises = [];
    promises.push(this.backendSrv.search({ type: hitTypes.FOLDER, folderIds: [folderId], query: name }));
    promises.push(this.backendSrv.search({ type: hitTypes.DASHBOARD, folderIds: [folderId], query: name }));

    this.$q.all(promises).then(res => {
      let hits = [];

      if (res.length > 0 && res[0].length > 0) {
        hits = res[0];
      }

      if (res.length > 1 && res[1].length > 0) {
        hits = hits.concat(res[1]);
      }

      for (let hit of hits) {
        if (nameLowerCased === hit.title.toLowerCase()) {
          deferred.reject({
            type: 'EXISTING',
            message: existingErrorMessage,
          });
          break;
        }
      }

      deferred.resolve();
    });

    return deferred.promise;
  }
}

coreModule.service('validationSrv', ValidationSrv);
