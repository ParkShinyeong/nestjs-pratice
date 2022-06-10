import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // ValidationPipe는 유효성 검사를 해준다. 
  app.useGlobalPipes( new ValidationPipe({
    whitelist: true, // true이면 아무 데코렝터가 없는 어떠한 property를 거른다. 
    forbidNonWhitelisted: true, // 화이트리스트가 아닌 속성을 제거하고, 유효성 검사가 오류를 발생한다. 
    transform: true, // 유저들이 보낸 정보를 우리가 원하는 실제 타입으로 바꾸어준다. 
  }));
  // npm i class-validator class-transformer 해주기 
  // Dto에서 ValidationPipe와 class-validator로 유효성을 검사해준다. 
  
  // 앱을 3000번 포트에서 염 
  await app.listen(3000);
}
bootstrap();
