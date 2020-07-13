import React from 'react';

const dark = {
  background: '#070215',
  movieName: '#9B528E',
  movieDuration: '#7992D2',
  movieGenre: '#935FA6',
  buttonBackground: '#202A3B',
  text: '#9590A8',
};

const light = {
  background: '#F4EBE8',
  movieName: '#5D6376',
  movieDuration: '#898190',
  movieGenre: '#787691',
  buttonBackground: '#DCCACB',
  text: '#2F4858',
};

export const ThemeContext = React.createContext(dark);
export const Themes = {
  dark,
  light,
};
