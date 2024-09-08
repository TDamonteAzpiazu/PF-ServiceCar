import { Controller, Get, UseGuards } from '@nestjs/common';
import { AdminDashService } from './adminDash.service';
import { Roles } from '../custom-decorators/roles.decorator';
import { Role } from '../auth/roles.enum';
import { RolesGuard } from '../auth/roles.guard';
import { AuthGuard } from '../auth/auth.guard';


@Controller('admin-dash')
@Roles(Role.Admin) 
@UseGuards(RolesGuard) 
@UseGuards(AuthGuard) 
export class AdminDashController {
  constructor(private readonly adminDashService: AdminDashService) {}

  @Get('sucursal-con-mas-reservas')
  async getSucursalConMasReservas(): Promise<{ sucursalId: string, totalReservas: number }> {
    return this.adminDashService.sucursalConMasReservas();
  }
}
