import { IsNumber, IsString } from 'class-validator';

// MoviesData의 유효성 검사를 위해 사용한다. 
// npm i @nestjs/mapped-types
import { PartialType } from '@nestjs/mapped-types';
import { CreateMovieDTO } from './create-movie.dto';

export class UpdateMovieDTO extends PartialType(CreateMovieDTO) {}