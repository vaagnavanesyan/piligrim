import { FilmSummary } from './film-summary';

export interface FilmListResult {
  slider: any[];
  films: FilmSummary[];
  isLastPage: boolean;
}
