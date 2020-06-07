import {readFileSync} from 'fs';
import {resolve} from 'path';
import {ParserService} from '../../';

const mockFetchToAsset = (filename: string) => {
  const html = readFileSync(
    // eslint-disable-next-line no-undef
    resolve(__filename, `../../assets/${filename}`),
    {
      encoding: 'utf-8',
    },
  );
  const fetch = async () => ({text: async () => html});
  global.fetch = fetch as any;
};

describe('ParserService', () => {
  describe('Dashboard', () => {
    it('should parse movies', async () => {
      mockFetchToAsset('dashboard.html');

      const dashboard = await ParserService.getDashboard();

      expect(dashboard.movies.length).toBeGreaterThan(0);
      expect(dashboard.isLastPage).toBeFalsy();
    });

    it('should parse movie', async () => {
      mockFetchToAsset('teremok.html');

      const movie = await ParserService.getMovie('teremok');

      expect(movie.name).toBe('Теремок');
      expect(movie.duration).toBe(39 * 60);
      expect(movie.genre).toBe('Документальный');
      expect(movie.description.split(' ')[0]).toBe('По');

      //TODO: Parse description footer to separate field
      expect(movie.description.split(' ').pop()).toBe('существовать.');

      expect(movie.video).toBe('https://www.youtube.com/watch?v=TwMshLRtgoU');
      expect(movie.festivals.length).toBeGreaterThanOrEqual(2);
      expect(movie.kinopoiskPage).toBeFalsy();
      expect(movie.images.length).toBe(7);
    });
  });
});
