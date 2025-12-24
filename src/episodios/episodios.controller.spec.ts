import { Test, TestingModule } from '@nestjs/testing';
import { EpisodiosController } from './episodios.controller';
import { EpisodiosService } from './episodios.service';

describe('EpisodiosController', () => {
  let controller: EpisodiosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EpisodiosController],
      providers: [EpisodiosService],
    }).compile();

    controller = module.get<EpisodiosController>(EpisodiosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
