import { Injectable } from '@nestjs/common';
import * as scrapeIt from 'scrape-it';
import { FilmListResult, Film } from './types';
import { FilmPageSelector, FilmListSelector } from '../selectors';

@Injectable()
export class ParserService {
  private baseAddress = 'https://piligrim.fund';
  async getFilms(page: number = 0): Promise<FilmListResult> {
    const url = new URL(this.baseAddress);
    url.searchParams.set('page', page.toString());
    const {
      data: { films, isLastPage },
    } = await scrapeIt(url.href, FilmListSelector);
    return { films, isLastPage } as FilmListResult;
  }
  async getFilm(id: string): Promise<Film> {
    const { data } = await scrapeIt(
      `${this.baseAddress}/film/${id}`,
      FilmPageSelector,
    );
    return (data as unknown) as Film;
  }
}
