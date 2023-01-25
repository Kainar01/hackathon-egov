import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';

import { HasDepotStaffRoles } from '@/common/decorators/depot-staff-roles.decorator';
import { ReqUser } from '@/common/decorators/req-user.decorator';
import type { UserPayload } from '@/modules/auth/auth.interface';
import { IsDepotStaffGuard } from '@/modules/auth/guards/is-depot-staff.guard';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';

import { CreateUntrackedParcelBodyDto } from '../dto/parcel-management/create-parcel.body.dto';
import { DepotStaffRoleType } from '../enum/depot-staff.enum';
import { ParcelManagementService } from '../services/parcel-management.service';

@Controller('depot/:depot/management/parcel')
export class ParcelManagementController {
  constructor(private readonly parcelManagement: ParcelManagementService) {}

  @HasDepotStaffRoles(DepotStaffRoleType.MANAGER, DepotStaffRoleType.ADMIN)
  @UseGuards(JwtAuthGuard, IsDepotStaffGuard)
  @Post('create')
  public async createParcel(
    @Param('depot') depotId: number,
      @ReqUser() user: UserPayload,
      @Body() data: CreateUntrackedParcelBodyDto,
  ): Promise<void> {
    return this.parcelManagement.createParcel(depotId, <number> user.depotStaffId, data);
  }
}
