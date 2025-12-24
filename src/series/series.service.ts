import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Serie } from './entities/series.entity';
import { CreateSeriesDto } from './dto/create-series.dto';
import { UpdateSeriesDto } from './dto/update-series.dto';

@Injectable()
export class SeriesService {
  constructor(
    @InjectRepository(Serie)
    private readonly repo: Repository<Serie>,
  ) {}

  create(createSeriesDto: CreateSeriesDto) {
    const serie = this.repo.create(createSeriesDto);
    return this.repo.save(serie);
  }

  findAll() {
    return this.repo.find({
      relations: ['episodios'],
    });
  }

  findOne(id: number) {
    return this.repo.findOne({
      where: { id },
      relations: ['episodios'],
    });
  }

  update(id: number, updateSeriesDto: UpdateSeriesDto) {
    return this.repo.update(id, updateSeriesDto);
  }

  remove(id: number) {
    return this.repo.delete(id);
  }
}
