import scrapeIt from 'scrape-it';
import {DashboardResult, Movie} from './types';
import {MoviePageSelector, DashboardSelector} from '../selectors';
import {URL} from 'react-native-url-polyfill';

export class ParserService {
  private baseAddress = 'https://piligrim.fund';
  async getDashboard(page: number = 0): Promise<DashboardResult> {
    const url = new URL(this.baseAddress);
    url.searchParams.set('page', page.toString());
    const html = await fetch(url.href).then(response => response.text());
    const {movies, slider, isLastPage} = await scrapeIt.scrapeHTML(
      html,
      DashboardSelector,
    );
    return {movies, slider, isLastPage};
  }
  async getMovie(id: string): Promise<Movie> {
    const {data} = await scrapeIt(
      `${this.baseAddress}/film/${id}`,
      MoviePageSelector,
    );
    return (data as unknown) as Movie;
  }
}
