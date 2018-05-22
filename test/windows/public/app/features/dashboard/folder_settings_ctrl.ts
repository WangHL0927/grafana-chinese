import { FolderPageLoader } from './folder_page_loader';
import appEvents from 'app/core/app_events';

export class FolderSettingsCtrl {
  folderPageLoader: FolderPageLoader;
  navModel: any;
  folderId: number;
  uid: string;
  canSave = false;
  folder: any;
  title: string;
  hasChanged: boolean;

  /** @ngInject */
  constructor(private backendSrv, navModelSrv, private $routeParams, private $location) {
    if (this.$routeParams.uid) {
      this.uid = $routeParams.uid;

      this.folderPageLoader = new FolderPageLoader(this.backendSrv);
      this.folderPageLoader.load(this, this.uid, 'manage-folder-settings').then(folder => {
        if ($location.path() !== folder.meta.url) {
          $location.path(`${folder.meta.url}/settings`).replace();
        }

        this.folder = folder;
        this.canSave = this.folder.canSave;
        this.title = this.folder.title;
      });
    }
  }

  save() {
    this.titleChanged();

    if (!this.hasChanged) {
      return;
    }

    this.folder.title = this.title.trim();

    return this.backendSrv
      .updateFolder(this.folder)
      .then(result => {
        if (result.url !== this.$location.path()) {
          this.$location.url(result.url + '/settings');
        }

        appEvents.emit('dashboard-saved');
        appEvents.emit('alert-success', ['文件夹已保存']);
      })
      .catch(this.handleSaveFolderError);
  }

  titleChanged() {
    this.hasChanged = this.folder.title.toLowerCase() !== this.title.trim().toLowerCase();
  }

  delete(evt) {
    if (evt) {
      evt.stopPropagation();
      evt.preventDefault();
    }

    appEvents.emit('confirm-modal', {
      title: 'Delete',
      text: `你想删除这个文件夹及其所有的仪表板吗？`,
      icon: 'fa-trash',
      yesText: '删除',
      onConfirm: () => {
        return this.backendSrv.deleteFolder(this.uid).then(() => {
          appEvents.emit('alert-success', ['文件夹已删除', `${this.folder.title} 已被删除`]);
          this.$location.url('dashboards');
        });
      },
    });
  }

  handleSaveFolderError(err) {
    if (err.data && err.data.status === 'version-mismatch') {
      err.isHandled = true;

      appEvents.emit('confirm-modal', {
        title: 'Conflict',
        text: '其他人已更新此文件夹。',
        text2: '你还要保存这个文件夹吗？',
        yesText: '保存并覆盖',
        icon: 'fa-warning',
        onConfirm: () => {
          this.backendSrv.updateFolder(this.folder, { overwrite: true });
        },
      });
    }
  }
}
