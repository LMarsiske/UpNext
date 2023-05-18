import { RESTDataSource } from "@apollo/datasource-rest";

class TvAPI extends RESTDataSource {
  override baseURL = "https://api.tvmaze.com/";
  async search(q: string) {
    console.log("QUERY IN TV-API: ", q);
    return this.get(`search/shows?q=${q}`);
  }
  async getGirls() {
    return this.get(`search/shows?q=girls`);
  }
}

export default TvAPI;
