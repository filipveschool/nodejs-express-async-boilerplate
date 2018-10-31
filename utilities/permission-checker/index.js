const _ = require('lodash');
const permissions = require('./permissions');
const actions = require('./constants');
const hasPermissionTo = (action, user) => {
  const isRoleHasPermission = action => role =>
    _.includes(permissions[role], action);

  // get map user roles into true false array

  const userPermissions = user.roles.map(isRoleHasPermission(action));

  return userPermissions && _.includes(userPermissions, true);
};

module.exports = {
  hasPermissionTo,
  actions,
};
