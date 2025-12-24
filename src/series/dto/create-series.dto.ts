import { IsString, IsNotEmpty } from 'class-validator';

export class CreateSeriesDto {
  @IsString()
  @IsNotEmpty()
  titulo: string;

  @IsString()
  genero: string;

  @IsString()
  sinopsis: string;

  @IsString()
  urlPortada: string;
}
