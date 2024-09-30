import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { routes, routesToByPass } from '../helpers/role-routes';
import { eModulePermission } from 'src/utils/types/entities.type';
import { iUserAuth } from 'src/common/interfaces/common.interface';

@Injectable()
export class PoliciesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) { }

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    const userAuth: iUserAuth = request.user;
    const currentRoute: string = request.route.path;
    const selectedRoute = routes.find(x => x.route === currentRoute && x.method === request.method);
    const selectedRouteToByPass = routesToByPass.find(x => x.route === currentRoute && x.method === request.method);

    // If route in by-pass, allow access
    if (selectedRouteToByPass !== undefined) {
      return true;
    }

    // If no policies are defined, allow access
    if (selectedRoute === undefined) {
      return true;
    }

    // Check if user has permission
    return userAuth.permissions?.some(permission => {
      return selectedRoute.permissions.find((policy) => policy.module === permission.module && ([policy.type, eModulePermission.MANAGE].includes(permission.type)));
    });
  }
}
