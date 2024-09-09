import { Controller, Get, Param, Post, Body, Patch, Delete, NotFoundException, Put } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Sucursal } from './sucursales.entity';
import { SucursalesService } from './sucursales.service';
import { CreateSucursalDto, UpdateSucursalDto } from '../dto/sucursales.dto';
import { Status } from '../enum/status.enum';

@ApiTags('Sucursales')
@Controller('sucursales')
export class SucursalesController {
  constructor(private readonly sucursalesService: SucursalesService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todas las sucursales' })
  async getAll(): Promise<Sucursal[]> {
    return await this.sucursalesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una sucursal por su ID' })
  async getById(@Param('id') id: string): Promise<Sucursal> {
    const sucursal = await this.sucursalesService.findById(id);
    if (!sucursal) {
      throw new NotFoundException('Sucursal no encontrada');
    }
    return sucursal;
  }

  @Post()
  @ApiOperation({ summary: 'Crear una nueva sucursal' })
  async create(@Body() createSucursalDto: CreateSucursalDto): Promise<Sucursal> {
    return await this.sucursalesService.create(createSucursalDto);
  }
  
    @Put('status/:id')
    @ApiOperation({ summary: 'Eliminar una sucursal (cambia el estado a inactivo)' })
    async delete(@Param('id') id: string): Promise<{ message: string }> {
      await this.sucursalesService.softDelete(id);
      return { message: 'Status de sucursal modificado correctamente' };
    }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar una sucursal existente' })
  async update(@Param('id') id: string, @Body() updateSucursalDto: UpdateSucursalDto): Promise<Sucursal> {
    return await this.sucursalesService.update(id, updateSucursalDto);
  }
}
