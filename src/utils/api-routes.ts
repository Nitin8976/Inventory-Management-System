const BASE_ROUTE = '/api';

const AUTH = `${BASE_ROUTE}/auth`;
const PRODUCTS = `${BASE_ROUTE}/Products`;
const SUPPLIER = `${BASE_ROUTE}/Supplier`;

const AUTH_ROUTES = {
    base: AUTH,
    register: '/',
    login: '/login',
    create: '/create',
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

const SUPPLIER_ROUTES = {
    base: SUPPLIER,
    createSUPPLIER: '/',
    updateSUPPLIER: '/',
    deleteSUPPLIER: '/:id',
    getSUPPLIERList: '/list',
    getSUPPLIERRoles: '/roles',
    getSUPPLIERDetail: '/:id'
};

const PRODUCTS_ROUTES = {
    base: PRODUCTS,
    createPRODUCTS: '/',
    updatePRODUCTS: '/',
    deletePRODUCTS: '/:id',
    getPRODUCTSList: '/list',
    getPRODUCTSRoles: '/roles',
    getPRODUCTSDetail: '/:id'
};

export {
    BASE_ROUTE,
    AUTH_ROUTES,
    ROLE_PERMISSION_ROUTES,
    SUPPLIER_ROUTES,
    PRODUCTS_ROUTES,
}
