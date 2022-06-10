import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  // service로 movieService의 메소드에 접근할 수 있다. 
  let service: MoviesService;

  // 각 함수를 실행하기 전에 실행하는 함수 
  // beforEach 외에도 beforeAll, afterEach, afterAll 등이 있다. 
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe("getAll()", () => {
    it("should return an array", () => {
      const result = service.getAll(); 
      expect(result).toBeInstanceOf(Array);  // 배열을 리턴하는지 안하는지 

    });
  });

  describe("getOne()", () => {
    it("should return a movie", () => {
      service.createMovie({
        title:"Test Movie", 
        genres: ["test"], 
        year:2020, 
      })

      const movie = service.getOne(1); 
      expect(movie).toBeDefined();
      expect(movie.id).toEqual(1); 

    });

    it("should throw 404 error", () => {

      try{
        service.getOne(999); 
      } catch(e) {
        expect(e).toBeInstanceOf(NotFoundException); 
        // expect(e.message).toEqual("MOVIE with ID 999 not found.")
      }
    });
  });

  describe("deleteOne", () => {
    it("delete a movie", () => {
      service.createMovie({
        title:"Test Movie", 
        genres: ["test"], 
        year:2020, 
      }); 

      const beforeDelete = service.getAll().length; 

      service.deleteOne(1)
      const afterDelete = service.getAll().length; 

      // expect(afterDelete).toEqual(allMovies - 1); 
      expect(afterDelete).toBeLessThan(beforeDelete); 
    });

    it("should return a 404", () => {
      try {
        service.deleteOne(999); 
      } catch(e) {
        expect(e).toBeInstanceOf(NotFoundException); 
      }
    });
  });
  

  describe("create", () => {
    it("should create a movie", () => {
      const beforeCreate = service.getAll().length; 
      service.createMovie({
        title:"Test Movie", 
        genres: ["test"], 
        year:2020, 
      }); 

      const afterCreate = service.getAll().length; 
      expect(afterCreate).toBeGreaterThan(beforeCreate); 

    });
  });

  describe("update", () => {
    it("should update a movie", () => {
      service.createMovie({
        title:"Test Movie", 
        genres: ["test"], 
        year:2020, 
      }); 

      service.update(1, {title: "Updated Test"}); 
      const movie = service.getOne(1); 
      expect(movie.title).toEqual("Updated Test"); 
    });

    it("should throw a NotFoundException", () => {
      try {
        service.update(999, {}); 
      } catch(e) {
        expect(e).toBeInstanceOf(NotFoundException); 
      }
    });
  });
});
