import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

import { UseAuth } from '@/common/decorators/auth.decorator';
import { RoleType } from '@/modules/user/enums/role.enum';

import { CreateDepotBodyDto } from '../dto/create-depot.body.dto';
import { DepotResponseDto } from '../dto/depot.response.dto';
import { GetDepotsQueryDto } from '../dto/get-depots.query.dto';
import { UpdateDepotBodyDto } from '../dto/update-depot.body.dto';
import { DepotService } from '../services/depot.service';

@Controller('admin/depot')
export class DepotAdminController {
  constructor(private readonly depot: DepotService) {}

  @UseAuth(RoleType.ADMIN)
  @ApiResponse({ type: [DepotResponseDto] })
  @Get('')
  public async getDepots(@Query() query: GetDepotsQueryDto): Promise<DepotResponseDto[]> {
    return this.depot.getDepots(query);
  }

  @UseAuth(RoleType.ADMIN)
  @ApiResponse({ type: [DepotResponseDto] })
  @Post('')
  public async createDepot(@Body() data: CreateDepotBodyDto): Promise<DepotResponseDto> {
    return this.depot.createDepot(data);
  }

  @UseAuth(RoleType.ADMIN)
  @Patch(':depot')
  public async updateDepot(@Param('depot') depotId: number, @Body() data: UpdateDepotBodyDto): Promise<void> {
    return this.depot.updateDepot(depotId, data);
  }

  @UseAuth(RoleType.ADMIN)
  @Delete(':depot')
  public async deleteDepot(@Param('depot') depotId: number): Promise<void> {
    return this.depot.deleteDepot(depotId);
  }
}
