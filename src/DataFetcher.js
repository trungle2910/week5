const API_KEY = "8bb27996f17866f8d8aa2ee7f2bb50aa";

const getMovieDetailData = async (movieId) => {
  const API_URL = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`;
  const response = await fetch(API_URL);
  const data = await response.json();
  console.log(data);
  return data;
};

export { getMovieDetailData };
