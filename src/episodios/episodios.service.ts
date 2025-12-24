import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Episodio } from './entities/episodio.entity';
import { Serie } from '../series/entities/series.entity';
import { CreateEpisodioDto } from './dto/create-episodio.dto';
import { UpdateEpisodioDto } from './dto/update-episodio.dto';

@Injectable()
export class EpisodiosService {
  constructor(
    @InjectRepository(Episodio)
    private readonly episodioRepository: Repository<Episodio>,
    @InjectRepository(Serie)
    private readonly serieRepository: Repository<Serie>,
  ) {}

  async create(createEpisodioDto: CreateEpisodioDto) {
  const serie = await this.serieRepository.findOneBy({ id: createEpisodioDto.serieId });
  if (!serie) {
    throw new Error(`Serie con id ${createEpisodioDto.serieId} no existe`);
  }

  const episodio = this.episodioRepository.create({
    titulo: createEpisodioDto.titulo,
    duracion: createEpisodioDto.duracion,
    numeroCapitulo: createEpisodioDto.numeroCapitulo,
    serie: { id: serie.id }, // solo id para relacion
  });

  return this.episodioRepository.save(episodio);
}

  findAll() {
    return this.episodioRepository.find({ relations: ['serie'] });
  }

  findOne(id: number) {
    return this.episodioRepository.findOne({ where: { id }, relations: ['serie'] });
  }

  update(id: number, updateEpisodioDto: UpdateEpisodioDto) {
    return this.episodioRepository.update(id, updateEpisodioDto);
  }

  remove(id: number) {
    return this.episodioRepository.delete(id);
  }
}
