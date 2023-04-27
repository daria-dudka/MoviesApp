import axios from 'axios';

const apiUrl = 'https://api.themoviedb.org/3/';
const apiKey = 'api_key=8bddd40d065eb3930fed6f196381f320';
export const imageUrl = 'https://image.tmdb.org/t/p/w500';

export const getPopularMovies = async () => {
  const response = await axios.get(`${apiUrl}movie/popular?${apiKey}`);
  return response.data.results;
};

export const getUpcomingMovies = async () => {
  const response = await axios.get(`${apiUrl}movie/upcoming?${apiKey}`);
  return response.data.results;
};

export const getPopularTv = async () => {
  const response = await axios.get(`${apiUrl}tv/popular?${apiKey}`);
  return response.data.results;
};

export const getFamilyMovies = async () => {
  const response = await axios.get(
    `${apiUrl}discover/movie?${apiKey}&with_genres=10751`,
  );
  return response.data.results;
};

export const getRomanceMovies = async () => {
  const response = await axios.get(
    `${apiUrl}discover/movie?${apiKey}&with_genres=10749`,
  );
  return response.data.results;
};

export const getMovie = async id => {
  const response = await axios.get(`${apiUrl}/movie/${id}?${apiKey}`);
  return response.data;
};

export const searchMovieTv = async (query, type) => {
  const response = await axios.get(
    `${apiUrl}/search/${type}?${apiKey}&query=${query}`,
  );
  return response.data.results;
};
