import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

import { HasDepotStaffRoles } from '@/common/decorators/depot-staff-roles.decorator';
import { ReqUser } from '@/common/decorators/req-user.decorator';
import type { UserPayload } from '@/modules/auth/auth.interface';
import { IsDepotStaffGuard } from '@/modules/auth/guards/is-depot-staff.guard';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';

import { DepotResponseDto } from '../dto/depot.response.dto';
import { CreateParcelBodyDto } from '../dto/parcel-management/create-parcel.body.dto';
import { DepotStaffRoleType } from '../enum/depot-staff.enum';
import { ParcelManagementService } from '../services/parcel-management.service';

@Controller('depot/:depot/parcel')
export class DepotParcelController {
  constructor(private readonly parcelManagement: ParcelManagementService) {}

  @HasDepotStaffRoles(DepotStaffRoleType.MANAGER, DepotStaffRoleType.ADMIN)
  @UseGuards(JwtAuthGuard, IsDepotStaffGuard)
  @ApiResponse({ type: [DepotResponseDto] })
  @Post('')
  public async createParcel(
    @Param('depot') depotId: number,
      @ReqUser() user: UserPayload,
      @Body() data: CreateParcelBodyDto,
  ): Promise<void> {
    return this.parcelManagement.createParcel(depotId, <number> user.depotStaffId, data);
  }
}
