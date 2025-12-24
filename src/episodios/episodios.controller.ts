import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { EpisodiosService } from './episodios.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../auth/roles.enum';

@Controller('episodios')
export class EpisodiosController {
  constructor(private readonly episodiosService: EpisodiosService) {}

  // 🔓 PÚBLICO
  @Get()
  findAll() {
    return this.episodiosService.findAll();
  }

  // 🔒 ADMIN
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  create(@Body() dto: any) {
    return this.episodiosService.create(dto);
  }

  // 🔒 ADMIN
  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  remove(@Param('id') id: string) {
    return this.episodiosService.remove(+id);
  }
}
