import { Test, TestingModule } from '@nestjs/testing';
import { ParserService } from './parser.service';

describe('ParserService', () => {
  let parser: ParserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ParserService],
    }).compile();

    parser = module.get<ParserService>(ParserService);
  });

  it('should be defined', () => {
    expect(parser).toBeDefined();
  });

  describe('Movie list', () => {
    xit('should parse movies', async () => {
      const films = await parser.getFilms();
      expect(films.films.length).toBeGreaterThan(0);
    });

    it('should parse movie', async () => {
      // TODO: move it to assets and then parse here

      const film = await parser.getFilm('teremok');
      expect(film.name).toBe('Теремок');
      expect(film.duration).toBe('39 мин.');
      expect(film.genre).toBe('Документальный');
      expect(film.video).toBe('https://www.youtube.com/watch?v=TwMshLRtgoU');
      expect(film.festivals.length).toBeGreaterThanOrEqual(2);
      expect(film.kinopoisk_page).toBeFalsy();
    });
  });
});
