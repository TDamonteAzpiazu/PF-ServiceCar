import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseUUIDPipe,
    Post,
    Put,
  } from '@nestjs/common';
  import { ApiTags } from '@nestjs/swagger';
  import { ServicesService } from './services.service';
  
  @ApiTags('services')
  @Controller('services')
  export class ServicesController {
    constructor(private readonly servicesService: ServicesService) {}
  
    @Get()
    async get() {
      return this.servicesService.getServices();
    }
  
    @Get(':id')
    async getById(@Param('id', ParseUUIDPipe) id: string) {
      return this.servicesService.getServiceById(id);
    }

    @Get('reservations/:id')
    async getActiveReservations(
      @Param('id', ParseUUIDPipe) id: string,
    ) {
      return this.servicesService.getActiveReservationsForService(id);
    }
  
    @Post()
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
    async disable(@Param('id', ParseUUIDPipe) id: string) {
      const serviceId = await this.servicesService.disableService(id);
  
      return {
        message: 'Service disabled successfully',
        id: serviceId,
      };
    }
  }