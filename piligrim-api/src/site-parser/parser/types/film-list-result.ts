import { FilmSummary } from './film-summary';

export interface FilmListResult {
  films: FilmSummary[];
  isLastPage: boolean;
}
