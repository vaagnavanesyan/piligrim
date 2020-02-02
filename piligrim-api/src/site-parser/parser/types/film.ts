export interface Film {
  description: string;
  name: string;
  duration: string;
  genre: string;
  about: string;
  festivals: Array<{
    title: string;
    nomination: string;
  }>;
  // thumbnails: [],  //todo
  images: Array<{
    full: string;
    preview: string;
  }>;
  video: string;
  kinopoisk_page: string;
}
