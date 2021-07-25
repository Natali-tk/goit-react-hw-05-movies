import axios from 'axios';
const key = '5012e08ae751acca00a49ffa4ee59713';
axios.defaults.baseURL = 'https://api.themoviedb.org/3/';

export const fetchTrandingMovies = async () => {
  const response = await axios.get(`trending/movie/day?api_key=${key}`);
  return response.data.results;
};

export const fetchMovie = async query => {
  const response = await axios.get(
    `search/movie?api_key=${key}&query=${query}&page=1&include_adult=false`,
  );
  return response.data.results;
};

export const fetchMovieDetails = async movieId => {
  const response = await axios.get(`movie/${movieId}?api_key=${key}`);
  return response.data;
};

export const fetchMovieCredits = async movieId => {
  const response = await axios.get(`movie/${movieId}/credits?api_key=${key}`);
  return response.data.cast;
};

export const fetchMovieReviews = async movieId => {
  const response = await axios.get(`movie/${movieId}/reviews?api_key=${key}`);
  return response.data.results;
};
