import { eModule, eModulePermission } from "src/utils/entities.type";
import {
  AUTH_ROUTES,
  ROLE_PERMISSION_ROUTES,
} from '../../utils/api-routes';

function getFullRoute(base: string, key: string) {
  return `/${process.env.DOC_API_V}${base}${key}`;
}

export const routesToByPass: any = [];

export const routes: any = [
  // AUTH_ROUTES
  {
    method: 'PUT',
    route: getFullRoute(AUTH_ROUTES.base, AUTH_ROUTES.updateAuthUserStatus),
    permissions: [{ module: eModule.USER_MANAGEMENT, type: eModulePermission.MANAGE }]
  },

  // ROLE_PERMISSION_ROUTES OR USER_MANAGEMENT
  {
    method: 'PUT',
    route: getFullRoute(ROLE_PERMISSION_ROUTES.base, ROLE_PERMISSION_ROUTES.updateAuthUser),
    permissions: [{ module: eModule.USER_MANAGEMENT, type: eModulePermission.MANAGE }]
  },
  {
    method: 'GET',
    route: getFullRoute(ROLE_PERMISSION_ROUTES.base, ROLE_PERMISSION_ROUTES.getAuthUserDetail),
    permissions: [{ module: eModule.USER_MANAGEMENT, type: eModulePermission.VIEW }]
  },

  {
    method: 'POST',
    route: getFullRoute(ROLE_PERMISSION_ROUTES.base, ROLE_PERMISSION_ROUTES.createUserRole),
    permissions: [{ module: eModule.ROLE_PERMISSION, type: eModulePermission.MANAGE }]
  },
  {
    method: 'PUT',
    route: getFullRoute(ROLE_PERMISSION_ROUTES.base, ROLE_PERMISSION_ROUTES.updateUserRole),
    permissions: [{ module: eModule.ROLE_PERMISSION, type: eModulePermission.MANAGE }]
  },
  {
    method: 'GET',
    route: getFullRoute(ROLE_PERMISSION_ROUTES.base, ROLE_PERMISSION_ROUTES.getAuthUserList),
    permissions: [{ module: eModule.ROLE_PERMISSION, type: eModulePermission.VIEW }]
  },
  {
    method: 'GET',
    route: getFullRoute(ROLE_PERMISSION_ROUTES.base, ROLE_PERMISSION_ROUTES.getUserRoleList),
    permissions: [{ module: eModule.ROLE_PERMISSION, type: eModulePermission.VIEW }]
  },
  {
    method: 'POST',
    route: getFullRoute(ROLE_PERMISSION_ROUTES.base, ROLE_PERMISSION_ROUTES.assignUserRole),
    permissions: [{ module: eModule.ROLE_PERMISSION, type: eModulePermission.MANAGE }]
  },
  {
    method: 'POST',
    route: getFullRoute(ROLE_PERMISSION_ROUTES.base, ROLE_PERMISSION_ROUTES.unAssignUserRole),
    permissions: [{ module: eModule.ROLE_PERMISSION, type: eModulePermission.MANAGE }]
  },

  {
    method: 'GET',
    route: getFullRoute(ROLE_PERMISSION_ROUTES.base, ROLE_PERMISSION_ROUTES.getRoleModulesList),
    permissions: [{ module: eModule.ROLE_PERMISSION, type: eModulePermission.VIEW }]
  },
  {
    method: 'GET',
    route: getFullRoute(ROLE_PERMISSION_ROUTES.base, ROLE_PERMISSION_ROUTES.getUserRoleDetail),
    permissions: [{ module: eModule.ROLE_PERMISSION, type: eModulePermission.VIEW }]
  },
];
