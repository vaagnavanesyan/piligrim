import { FestivalItem } from './festival-item';
import { Image } from './image';
export interface Movie {
  description: string;
  name: string;
  duration: number;
  genre: string;
  about: string;
  festivals: FestivalItem[];
  images: Image[];
  video: string;
  kinopoiskPage: string;
}
