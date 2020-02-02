export const FilmPageSelector = {
  description: '.product-short-description',
  name: '.entry-title',
  genre: {
    selector: '.single-genre-time',
    convert: (x: string) => x.split(',')[0],
  },
  duration: {
    selector: '.single-genre-time',
    convert: (x: string) => x.split('\n')[1].trim(),
  },

  about: {
    listItem: '#tab-additional_information table tr',
    data: {
      field: 'th',
      value: 'td',
    },
  },
  festivals: {
    listItem: '#tab-product-festivals li',
    data: {
      title: {
        convert: x => {
          const match = x.match(/– (?<title>(.*))\s-\s(?<nomination>(.*))/);
          if (!match || !match.groups.title) {
            return '';
          }
          return match.groups.title;
        },
      },
      nomination: {
        convert: x => {
          const match = x.match(/– (?<title>(.*))\s-\s(?<nomination>(.*))/);
          if (!match || !match.groups.nomination) {
            return '';
          }
          return match.groups.nomination;
        },
      },
    },
  },
  // thumbnails: [],  //todo
  images: {
    listItem: '#nm-product-images-slider a',
    data: {
      full: { attr: 'href' },
      preview: {
        selector: 'img',
        attr: 'src',
      },
    },
  },
  video: {
    selector: '#nm-featured-video-link', // vimeo.com -> player.vimeo.com/video/
    attr: 'href',
  },
  kinopoisk_page: {
    selector: '.icon-link-ext',
    how: x => {
      if (!x[0] || !x[0].parent) {
        return '';
      }
      return x[0].parent.attribs.href;
    },
  },
};
