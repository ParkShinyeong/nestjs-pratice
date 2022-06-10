import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MoviesModule } from './movies/movies.module';

//데코레이터 - 클래스에 함수 기능을 추가할 수 있다. 

@Module({
  imports: [MoviesModule],
  controllers: [AppController], 
  providers: [],
})
export class AppModule {}
