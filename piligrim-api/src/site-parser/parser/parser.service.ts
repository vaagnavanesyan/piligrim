import { Injectable } from '@nestjs/common';
import * as scrapeIt from 'scrape-it';
import { DashboardResult, Film } from './types';
import { FilmPageSelector, DashboardSelector } from '../selectors';

@Injectable()
export class ParserService {
  private baseAddress = 'https://piligrim.fund';
  async getDashboard(page: number = 0): Promise<DashboardResult> {
    const url = new URL(this.baseAddress);
    url.searchParams.set('page', page.toString());
    const {
      data: { films, slider, isLastPage },
    } = await scrapeIt(url.href, DashboardSelector);
    return { films, slider, isLastPage } as DashboardResult;
  }
  async getFilm(id: string): Promise<Film> {
    const { data } = await scrapeIt(
      `${this.baseAddress}/film/${id}`,
      FilmPageSelector,
    );
    return (data as unknown) as Film;
  }
}
