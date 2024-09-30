const BASE_ROUTE = '/api';

const AUTH = `${BASE_ROUTE}/auth`;

const AUTH_ROUTES = {
    base: AUTH,
    register: '/',
    login: '/login',
    updateAuthUser: '/',
    updateAuthUserStatus: '/user/status',
    updateAuthUserPassword: '/user/password',
    getAuthUserPermissionList: 'user/roles',
    getAuthUserDetail: '/user/:id'
};

const ROLE_PERMISSION_ROUTES = {
    base: AUTH,
    updateAuthUser: 'manage/user',
    getAuthUserDetail: '/manage/user/:id',

    createUserRole: '/role',
    updateUserRole: '/role',
    getAuthUserList: '/users',
    getUserRoleList: '/roles',
    assignUserRole: '/role/assign',
    unAssignUserRole: '/role/un-assign',
    getRoleModulesList: '/role/modules',
    getUserRoleDetail: '/role/:id'
};

export {
    BASE_ROUTE,
    AUTH_ROUTES,
    ROLE_PERMISSION_ROUTES
}
