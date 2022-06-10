import { Controller, Get, Param, Post, Delete, Put, Patch, Body, Query } from '@nestjs/common';
import { CreateMovieDTO } from './dto/create-movie.dto';
import { UpdateMovieDTO } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
    constructor(private readonly moviesService: MoviesService) {}
    
    @Get() 
    getAll():Movie[] {
        return this.moviesService.getAll(); 
    }

    // query parameter 사용법 
    // @Get("search") 
    // search(@Query("year") searchingYear: string) {
    //     return `We are searching for a movie made after: ${searchingYear}`; 
    // }

    // get 요청, Param 사용법 
    @Get("/:id")
    getOne(@Param("id") id: number ): Movie {
        return this.moviesService.getOne(id); 
    }

    // post 요청, 요청 시 Body를 받아오고 싶으면 @Body 데코레이터를 사용한다. 
    @Post()
    create(@Body() movieData: CreateMovieDTO) { 
        return this.moviesService.createMovie(movieData); 
    }

    // Delete 요청 
    @Delete("/:id")
    remove(@Param('id') movieId: number) {
        return this.moviesService.deleteOne(movieId); 
    }
    
    // Patch 요청, Param과 Body 둘 다 사용할 때 
    @Patch("/:id") 
    patch(@Param('id') movieId: number, @Body() updateData: UpdateMovieDTO) {
        return this.moviesService.update(movieId, updateData)
    }
}
