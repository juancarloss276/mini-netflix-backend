import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { SeriesService } from './series.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../auth/roles.enum';

@Controller('series')
export class SeriesController {
  constructor(private readonly seriesService: SeriesService) {}

  // 🔓 PÚBLICO
  @Get()
  findAll() {
    return this.seriesService.findAll();
  }

  // 🔒 ADMIN
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  create(@Body() dto: any) {
    return this.seriesService.create(dto);
  }

  // 🔒 ADMIN
  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  update(@Param('id') id: string, @Body() dto: any) {
    return this.seriesService.update(+id, dto);
  }

  // 🔒 ADMIN
  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  remove(@Param('id') id: string) {
    return this.seriesService.remove(+id);
  }
}
