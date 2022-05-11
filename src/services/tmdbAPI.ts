import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_TMDB_API_URL;
const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

const getLatestMovies = async () => {
  const response = await axios.get(
    API_URL + '/movie/now_playing?api_key=' + API_KEY + '&language=pt'
  );

  console.log(response.data);

  return response.data;
};

export { getLatestMovies };
