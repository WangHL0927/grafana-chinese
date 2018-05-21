import React, { Component } from 'react';
import PermissionsListItem from './PermissionsListItem';
import DisabledPermissionsListItem from './DisabledPermissionsListItem';
import { observer } from 'mobx-react';
import { FolderInfo } from './FolderInfo';

export interface IProps {
  permissions: any[];
  removeItem: any;
  permissionChanged: any;
  fetching: boolean;
  folderInfo?: FolderInfo;
}

@observer
class PermissionsList extends Component<IProps, any> {
  render() {
    const { permissions, removeItem, permissionChanged, fetching, folderInfo } = this.props;

    return (
      <table className="filter-table gf-form-group">
        <tbody>
          <DisabledPermissionsListItem
            key={0}
            item={{
              name: 'Admin',
              permission: 4,
              icon: 'fa fa-fw fa-street-view',
            }}
          />
          {permissions.map((item, idx) => {
            return (
              <PermissionsListItem
                key={idx + 1}
                item={item}
                itemIndex={idx}
                removeItem={removeItem}
                permissionChanged={permissionChanged}
                folderInfo={folderInfo}
              />
            );
          })}
          {fetching === true && permissions.length < 1 ? (
            <tr>
              <td colSpan={4}>
                <em>加载权限...</em>
              </td>
            </tr>
          ) : null}

          {fetching === false && permissions.length < 1 ? (
            <tr>
              <td colSpan={4}>
                <em>没有设置权限。 只能由管理员访问。</em>
              </td>
            </tr>
          ) : null}
        </tbody>
      </table>
    );
  }
}

export default PermissionsList;
