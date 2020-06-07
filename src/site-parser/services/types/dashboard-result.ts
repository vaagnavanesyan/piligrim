import { MovieSummary } from './movie-summary';
import { SliderItem } from './slider-item';

export interface DashboardResult {
  slider: SliderItem[];
  movies: MovieSummary[];
  isLastPage: boolean;
}
