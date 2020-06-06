import { ParserService } from './parser.service';

describe('ParserService', () => {
  let parser: ParserService;

  beforeEach(async () => {
    parser = module.get<ParserService>(ParserService);
  });

  it('should be defined', () => {
    expect(parser).toBeDefined();
  });

  describe('Dashboard', () => {
    it('should parse movies', async () => {
      jest.setTimeout(20000);
      const dashboard = await parser.getDashboard();
      expect(dashboard.movies.length).toBeGreaterThan(0);
    });

    it('should parse movie', async () => {
      // TODO: move it to assets and then parse here

      const movie = await parser.getMovie('teremok');
      expect(movie.name).toBe('Теремок');
      expect(movie.duration).toBe(39 * 60);
      expect(movie.genre).toBe('Документальный');
      expect(movie.video).toBe('https://www.youtube.com/watch?v=TwMshLRtgoU');
      expect(movie.festivals.length).toBeGreaterThanOrEqual(2);
      expect(movie.kinopoiskPage).toBeFalsy();
    });
  });
});
