import { RESTDataSource } from "@apollo/datasource-rest";

class TvAPI extends RESTDataSource {
  override baseURL = "https://api.tvmaze.com/";
  async search(q: string) {
    return this.get(`search/shows?q=${q}`);
  }
  async getShow(id: string) {
    return this.get(`/shows/${id}?embed=cast`);
  }
}

export default TvAPI;
