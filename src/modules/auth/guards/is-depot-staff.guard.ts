import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { InjectEntityManager } from '@nestjs/typeorm';
import _ from 'lodash';
import type { EntityManager } from 'typeorm';

import { TableName } from '@/common/enums/table';
import type { DepotStaffRoleType } from '@/modules/depot/enum/depot-staff.enum';

import type { UserPayload } from '../auth.interface';

@Injectable()
export class IsDepotStaffGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<DepotStaffRoleType[]>('depotStaffRoles', [
      context.getHandler(),
      context.getClass(),
    ]);

    const request = context.switchToHttp().getRequest();
    const depot = parseInt(<string> request.params.depot, 10);
    const user = <UserPayload>request.user;

    if (!depot || !user.depotStaffId) {
      return false;
    }

    const depotStaffRoles = await this.entityManager
      .query(
        `
      SELECT dsr."role" FROM ${TableName.DEPOT_STAFF_ROLE} AS dsr
        WHERE dsr."depotId" = $1 AND dsr."depotStaffId" = $2 AND dsr."deactivatedAt" IS NULL
    `,
        [depot, user.depotStaffId],
      )
      .then((rows: Record<'role', DepotStaffRoleType>[]) => _.map(rows, 'role'));

    console.log(depotStaffRoles);
    const isDepotStaff = !_.isEmpty(depotStaffRoles);

    if (_.isEmpty(requiredRoles)) {
      return isDepotStaff;
    }

    return requiredRoles.some((requiredRole: DepotStaffRoleType) => depotStaffRoles.includes(requiredRole));
  }
}
