export const DashboardSelector = {
  slider: {
    listItem: '.nm-banner',
    data: {
      image: {
        selector: 'img',
        attr: 'src',
      },
      link: {
        selector: 'a',
        attr: 'href',
      },
    },
  },
  movies: {
    listItem: '.type-product',
    data: {
      name: '.nm-shop-loop-details > h3',
      genre: {
        selector: '.loop-genre-time',
        convert: (x: string) => x.split(',')[0],
      },
      duration: {
        selector: '.loop-genre-time',
        convert: (x: string) => parseInt(x.split('\n')[1].trim(), 10) * 60,
      },
      link: { selector: '.nm-shop-loop-thumbnail > a', attr: 'href' },
      poster: {
        selector: '.nm-shop-loop-thumbnail > a > img',
        attr: 'src',
      },
    },
  },
  isLastPage: { selector: '.js-load-more', convert: (x) => !x },
};
