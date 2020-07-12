import scrapeIt from 'scrape-it';
import { DashboardResult, Movie } from './types';
import { MoviePageSelector, DashboardSelector } from '../selectors';
import { URL } from 'react-native-url-polyfill';
const baseAddress = 'https://piligrim.fund';

export class ParserService {
  public static async getDashboard(page: number = 0): Promise<DashboardResult> {
    console.log('GET DASHBOARD: ' + page);
    const url = new URL(baseAddress);
    url.searchParams.set('page', page.toString());
    const html = await fetch(url.href).then((response) => response.text());
    const { movies, slider, isLastPage } = await scrapeIt.scrapeHTML(
      html,
      DashboardSelector,
    );
    return { movies, slider, isLastPage };
  }
  public static async getMovie(id: string): Promise<Movie> {
    console.log('GET MOVIE: ' + id);
    const url = this.getAbsoluteUrl(id);
    const html = await fetch(url).then((response) => response.text());
    const data = await scrapeIt.scrapeHTML(html, MoviePageSelector);
    return (data as unknown) as Movie;
  }
  public static getAbsoluteUrl(part: string) {
    return `https://piligrim.fund${part}`;
  }
}
