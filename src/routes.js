// const cors = 'https://cors-anywhere.herokuapp.com';
const cors = 'https://cors-anywhere-venky.herokuapp.com';
const host = 'www.metaweather.com';
const prefix = 'api/location';

export default {
  location: (latt, long) => [cors, host, prefix, 'search', `?lattlong=${latt},${long}`].join('/'),
  weather: (woeid) => [cors, host, prefix, woeid].join('/'),
  search: (str) => [cors, host, prefix, 'search', `?query=${str}`].join('/'),
};