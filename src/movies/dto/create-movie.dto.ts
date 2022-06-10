import { IsNumber, IsOptional, IsString } from 'class-validator';

// MoviesData의 유효성 검사를 위해 사용한다. 
export class CreateMovieDTO {
    @IsString() // String인지 확인 
    readonly title: string; 

    @IsNumber() // Number인지 확인 
    readonly year: number; 

    @IsOptional()
    @IsString({ each: true }) // 모든 요소가 String인지 검사한다. 
    readonly genres: string[]; 
}