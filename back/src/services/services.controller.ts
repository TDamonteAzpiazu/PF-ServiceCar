import {
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
  
  @ApiTags('services')
  @Controller('services')
  export class ServicesController {
    constructor(private readonly servicesService: ServicesService) {}
  
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
    @ApiOperation({ summary: 'crear un servicio' })
    async create(@Body() body) {
      const { type, description, location, image, price } = body;
  
      const serviceId = await this.servicesService.addService({
        type,
        description,
        location,
        image,
        price,
        appointments: []
      });
  
      return {
        message: 'Service created successfully',
        id: serviceId,
      };
    }
  
    @Put(':id')
    //@UseGuards(AuthGuard)
    @ApiOperation({ summary: 'actualizar un servicio' })
    async update(@Param('id', ParseUUIDPipe) id: string, @Body() body) {
      const { type, description, location, image, price } = body;
  
      const serviceId = await this.servicesService.updateService(id, {
        type,
        description,
        location,
        image,
        price,
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