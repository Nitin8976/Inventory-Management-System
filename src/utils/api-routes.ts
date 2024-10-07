const BASE_ROUTE = '/api';

const AUTH = `${BASE_ROUTE}/auth`;
const DEPARTMENT = `${BASE_ROUTE}/Department`;
const EMPLOYEE = `${BASE_ROUTE}/emplyoee`;

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

const EMPLOYEE_ROUTES = {
    base: EMPLOYEE,
    createEmployee: '/',
    updateEmployee: '/',
    deleteEmployee: '/:id',
    getEmployeeList: '/list',
    getEmployeeRoles: '/roles',
    getEmployeeDetail: '/:id'
};

const DEPARTMENT_ROUTES = {
    base: DEPARTMENT,
    createDepartment: '/',
    updateDepartment: '/',
    deleteDepartment: '/:id',
    getDepartmentList: '/list',
    getDepartmentRoles: '/roles',
    getDepartmentDetail: '/:id'
};

export {
    BASE_ROUTE,
    AUTH_ROUTES,
    ROLE_PERMISSION_ROUTES,
    EMPLOYEE_ROUTES,
    DEPARTMENT_ROUTES,
}
