import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  // 매번 테스트가 실행될 때마다 어플리케이션을 생성한다. 
  // beforeEach(async () => { => BeforeEach를 beforeAll로 수정 
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    // 테스트 어플리케이션도 실제 어플리케이션처럼 작동하도록 설정해주어야 한다. 
    app.useGlobalPipes( new ValidationPipe({
      whitelist: true, // true이면 아무 데코렝터가 없는 어떠한 property를 거른다. 
      forbidNonWhitelisted: true, // 화이트리스트가 아닌 속성을 제거하고, 유효성 검사가 오류를 발생한다. 
      transform: true, // 유저들이 보낸 정보를 우리가 원하는 실제 타입으로 바꾸어준다. 
    }));

    await app.init();
  });
  // url에 대한 요청을 테스트 한다. 
  // Controller, Service, Pipe의 결과에 대해 모든 테스트를 하고 있다. 
  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Welcome to my Movie API');
  });

  describe("/movies", () => {
    it("GET", () => {
      return request(app.getHttpServer())
      .get("/movies")
      .expect(200)
      .expect([]); 
    }); 

    it("POST 201", () => {
      return request(app.getHttpServer())
      .post('/movies')
      .send({
        title:"Test", 
        year: 2000, 
        genres:["test"], 
      })
      .expect(201); 
    }); 

    it("POST 400", () => {
      return request(app.getHttpServer())
      .post('/movies')
      .send({
        title:"Test", 
        year: 2000, 
        genres:["test"],
        others: "thing",  
      })
      .expect(400); 
    }); 

    it("DELETE", () => {
      return request(app.getHttpServer()).delete('/movies').expect(404); 
    });
  });

  describe("/movies/:id", () => {
    it("GET 200", () => {
      return request(app.getHttpServer()).get("/movies/1")
      .expect(200); 
    }); 

    it("GET 404", () => {
      return request(app.getHttpServer()).get("/movies/999")
      .expect(404); 
    }); 

    it("PATCH 200", () => {
      return request(app.getHttpServer()).patch('/movies/1')
      .send({title: "Updated Text"})
      .expect(200); 
    }); 

    it("DELETE 200", () => {
      return request(app.getHttpServer()).delete('/movies/1')
      .expect(200); 
    }); 
  });
});
