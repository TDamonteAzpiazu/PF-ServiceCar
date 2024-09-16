import {
  BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseUUIDPipe,
    Post,
    Put,
    UseGuards,
  } from '@nestjs/common';
  import { ApiOperation, ApiTags } from '@nestjs/swagger';
  import { ServicesService } from './services.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateServiceDto, UpdateServiceDto } from '../dto/create-service.dto';
import { SucursalesService } from '../sucursales/sucursales.service';
  
  @ApiTags('services')
  @Controller('services')
  export class ServicesController {
    constructor(
      private readonly servicesService: ServicesService,
      private readonly sucursalesService: SucursalesService,
    ) {}
  
    @Get()
    //@UseGuards(AuthGuard)
    @ApiOperation({ summary: 'Obtener todos los services' })
    async get() {
      return this.servicesService.getServices();
    }
  
    @Get(':id')
    //@UseGuards(AuthGuard)
    @ApiOperation({ summary: 'Obtener los services por :id' })
    async getById(@Param('id', ParseUUIDPipe) id: string) {
      return this.servicesService.getServiceById(id);
    }

    @Get('reservations/:id')
    //@UseGuards(AuthGuard)
    @ApiOperation({ summary: 'Obtener cantidad de reservas por servicio' })
    async getActiveReservations(
      @Param('id', ParseUUIDPipe) id: string,
    ) {
      return this.servicesService.getActiveReservationsForService(id);
    }
  
    @Post()
  //@UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Crear un servicio' })
  async create(@Body() body: CreateServiceDto) {
    const serviceId = await this.servicesService.addService(body);

    return {
      message: 'Service created successfully',
      id: serviceId,
    };
  }
  
  @Put('status/:id')
  //@UseGuards(AuthGuard)
  @ApiOperation({ summary: 'eliminar un servicio' })
  async disable(@Param('id', ParseUUIDPipe) id: string) {
    const serviceId = await this.servicesService.disableService(id);

    return {
      message: 'Service disabled successfully',
      id: serviceId,
    };
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un servicio' })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateServiceDto, // Cambiado a UpdateServiceDto
  ) {
    const updatedService = await this.servicesService.updateService(id, body);
    
    return {
      message: 'Service updated successfully',
      service: updatedService,
    };
  }
  // agregar un servicio a una sucursal  
  @Put(':serviceId/sucursales/:sucursalId')
@ApiOperation({ summary: 'Agregar un servicio a una sucursal' })
async addServiceToSucursal(
  @Param('serviceId', ParseUUIDPipe) serviceId: string,
  @Param('sucursalId', ParseUUIDPipe) sucursalId: string,
) {
  const sucursalActualizada = await this.servicesService.addServiceToSucursal(serviceId, sucursalId);

  return {
    message: 'Service added to sucursal successfully',
    sucursal: sucursalActualizada,
  };
}
  }