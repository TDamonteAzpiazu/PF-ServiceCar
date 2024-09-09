import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AppointmentsService } from './appointments.service';
import { Appointment } from './appointments.entity';
import { AuthGuard } from '../auth/auth.guard';
import { CreateAppointmentDto } from '../dto/create-appointment.dto'; 

@ApiTags('appointments')
@ApiBearerAuth()
@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Get()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Obtener todas las citas' })
  @ApiResponse({ status: 200, description: 'Devuelve todas las citas.', type: [Appointment] })
  @ApiResponse({ status: 401, description: 'No autorizado.' })
  async findAll(): Promise<Appointment[]> {
    return this.appointmentsService.findAll();
  }

  @Get('user/:id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Obtener todas las citas de un usuario' })
  @ApiResponse({ status: 200, description: 'Devuelve todas las citas de un usuario.', type: [Appointment] })
  @ApiResponse({ status: 401, description: 'No autorizado.' })
  async findAllByUser(@Param('id') id: string): Promise<Appointment[]> {
    return this.appointmentsService.findAllByUser(id);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Obtener una cita por ID' })
  @ApiResponse({ status: 200, description: 'Devuelve la cita correspondiente al ID.', type: Appointment })
  @ApiResponse({ status: 401, description: 'No autorizado.' })
  @ApiResponse({ status: 404, description: 'Cita no encontrada.' })
  async findOne(@Param('id') id: string): Promise<Appointment> {
    return this.appointmentsService.findOne(id);
  }

  @Post()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Crear una nueva cita' })
  @ApiResponse({ status: 201, description: 'La cita ha sido creada exitosamente.', type: Appointment })
  @ApiResponse({status:400, description:'Datos invalidos o la cita no cumple con las restricciones.'})
  @ApiResponse({ status: 401, description: 'No autorizado.' })
  async create(@Body() createAppointmentDto: CreateAppointmentDto): Promise<Appointment> {
    return this.appointmentsService.create(createAppointmentDto);
  }
  
  @Put('status/:id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Eliminar una cita por ID' })
  @ApiResponse({ status: 204, description: 'La cita ha sido eliminada exitosamente.' })
  @ApiResponse({ status: 401, description: 'No autorizado.' })
  @ApiResponse({ status: 404, description: 'Cita no encontrada.' })
  async remove(@Param('id') id: string): Promise<void> {
    return this.appointmentsService.remove(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Actualizar una cita existente' })
  @ApiResponse({ status: 200, description: 'La cita ha sido actualizada exitosamente.', type: Appointment })
  @ApiResponse({ status: 401, description: 'No autorizado.' })
  @ApiResponse({ status: 404, description: 'Cita no encontrada.' })
  async update(
    @Param('id') id: string,
    @Body() updateAppointmentDto: Partial<CreateAppointmentDto>,
  ): Promise<Appointment> {
    return this.appointmentsService.update(id, updateAppointmentDto);
  }
}
