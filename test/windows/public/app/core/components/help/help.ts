import coreModule from '../../core_module';
import appEvents from 'app/core/app_events';

export class HelpCtrl {
  tabIndex: any;
  shortcuts: any;

  /** @ngInject */
  constructor() {
    this.tabIndex = 0;
    this.shortcuts = {
      Global: [
        { keys: ['g', 'h'], description: '转到 主页仪表板' },
        { keys: ['g', 'p'], description: '转到 总览' },
        { keys: ['s', 'o'], description: '打开搜索' },
        { keys: ['s', 's'], description: '使用收藏过滤打开搜索' },
        { keys: ['s', 't'], description: '使用标签视图打开搜索' },
        { keys: ['esc'], description: '退出编辑/设置视图' },
      ],
      Dashboard: [
        { keys: ['mod+s'], description: '保存 仪表板' },
        { keys: ['d', 'r'], description: '刷新所有面板' },
        { keys: ['d', 's'], description: '仪表板设置' },
        { keys: ['d', 'v'], description: '切换 活动状态/查看模式' },
        { keys: ['d', 'k'], description: '切换浏览模式（隐藏顶部导航）' },
        { keys: ['d', 'E'], description: '展开所有行' },
        { keys: ['d', 'C'], description: '折叠所有行' },
        { keys: ['mod+o'], description: '切换共享光标' },
      ],
      'Focused Panel': [
        { keys: ['e'], description: '切换面板编辑视图' },
        { keys: ['v'], description: '切换面板全屏视图' },
        { keys: ['p', 's'], description: '打开面板共享' },
        { keys: ['p', 'd'], description: '复制面板' },
        { keys: ['p', 'r'], description: '移除面板' },
      ],
      'Time Range': [
        { keys: ['t', 'z'], description: '缩小时间范围' },
        {
          keys: ['t', '<i class="fa fa-long-arrow-left"></i>'],
          description: '向后移动时间范围',
        },
        {
          keys: ['t', '<i class="fa fa-long-arrow-right"></i>'],
          description: '向前移动时间范围',
        },
      ],
    };
  }

  dismiss() {
    appEvents.emit('hide-modal');
  }
}

export function helpModal() {
  return {
    restrict: 'E',
    templateUrl: 'public/app/core/components/help/help.html',
    controller: HelpCtrl,
    bindToController: true,
    transclude: true,
    controllerAs: 'ctrl',
    scope: {},
  };
}

coreModule.directive('helpModal', helpModal);
