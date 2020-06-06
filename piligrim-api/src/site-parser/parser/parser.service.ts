import { Injectable } from '@nestjs/common';
import * as scrapeIt from 'scrape-it';
import { DashboardResult, Movie } from './types';
import { MoviePageSelector, DashboardSelector } from '../selectors';

@Injectable()
export class ParserService {
  private baseAddress = 'https://piligrim.fund';
  async getDashboard(page: number = 0): Promise<DashboardResult> {
    const url = new URL(this.baseAddress);
    url.searchParams.set('page', page.toString());
    const {
      data: { movies, slider, isLastPage },
    } = await scrapeIt(url.href, DashboardSelector);
    return { movies, slider, isLastPage } as DashboardResult;
  }
  async getMovie(id: string): Promise<Movie> {
    const { data } = await scrapeIt(
      `${this.baseAddress}/film/${id}`,
      MoviePageSelector,
    );
    return (data as unknown) as Movie;
  }
}
