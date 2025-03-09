import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const { id } = request.params;
    const user = request.user;

    if (user.profile === 'admin') return true;

    if (user.id !== +id) {
      throw new ForbiddenException(
        'You are not authorized to access this route',
      );
    }

    return true;
  }
}

@Injectable()
export class OnlyAdminGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    const user = request.user;

    if (user.profile !== 'admin') {
      throw new ForbiddenException(
        'You are not authorized to access this route',
      );
    }

    return true;
  }
}
