import { RESTDataSource } from "@apollo/datasource-rest";

class MovieAPI extends RESTDataSource {
  override baseURL = "https://api.themoviedb.org/3/";
  async search(q: string) {
    return this.get(
      `search/movie?api_key=${process.env.TMDB_API_KEY}&language=en-US&query=${q}&page=1&include_adult=false`
    );
  }
  async getMovie(id: string) {
    return this.get(
      `movie/${id}?api_key=${process.env.TMDB_API_KEY}&language=en-US`
    );
  }
  async getCredits(id: string) {
    return this.get(
      `movie/${id}/credits?api_key=${process.env.TMDB_API_KEY}&language=en-US`
    );
  }

  async getProviders(id: string) {
    return this.get(
      `movie/${id}/watch/providers?api_key=${process.env.TMDB_API_KEY}`
    );
  }
}

export default MovieAPI;
