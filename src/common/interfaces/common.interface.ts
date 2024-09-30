

export interface iUserPermission {
  type: string;
  module: string;
}

export interface iUserAuth {
  exp: Date;
  iat: Date;
  name: string;
  email: string;
  userID: string;
  permissions: iUserPermission[];
}
