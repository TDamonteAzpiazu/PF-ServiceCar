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
import { CreateServiceDto } from '../dto/create-service.dto';
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
  
  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un servicio' })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: Partial<CreateServiceDto>,
  ) {
    const { type, description, price, sucursales, vehiculo } = body;

    // Convert sucursales names to instances
    const sucursalesEntities = await this.sucursalesService.findByNames(sucursales);
    if (sucursalesEntities.length !== sucursales.length) {
      throw new BadRequestException('Some of the provided branch names are invalid');
    }

    const serviceId = await this.servicesService.updateService(id, {
      type,
      description,
      price,
      sucursales: sucursalesEntities,
      vehiculo,
    });

    return {
      message: 'Service updated successfully',
      id: serviceId,
    };
  }
  
    @Delete(':id')
    //@UseGuards(AuthGuard)
    @ApiOperation({ summary: 'eliminar un servicio' })
    async disable(@Param('id', ParseUUIDPipe) id: string) {
      const serviceId = await this.servicesService.disableService(id);
  
      return {
        message: 'Service disabled successfully',
        id: serviceId,
      };
    }
  }