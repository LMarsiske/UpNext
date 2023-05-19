import { RESTDataSource } from "@apollo/datasource-rest";

class MovieAPI extends RESTDataSource {
  override baseURL = "https://api.themoviedb.org/3/";
  async search(q: string) {
    return this.get(
      `search/movie?api_key=${process.env.TMDB_API_KEY}&language=en-US&query=${q}&page=1&include_adult=false`
    );
  }
  async getJackReacher() {
    return this.get(
      `movie/75780?api_key=${process.env.TMDB_API_KEY}&language=en-US`
    );
  }
}

export default MovieAPI;
