import { AugmentedRequest, RESTDataSource } from "@apollo/datasource-rest";
import { ValueOrPromise } from "@apollo/datasource-rest/dist/RESTDataSource";

class GameAPI extends RESTDataSource {
  override baseURL = "https://api.igdb.com/v4/";

  protected willSendRequest(
    path: string,
    request: AugmentedRequest
  ): ValueOrPromise<void> {
    request.headers["Client-ID"] = process.env.IGDB_CLIENT_ID!;
    request.headers["Authorization"] = process.env.IGDB_AUTH!;
  }

  async search(q: string) {
    return this.post(`games`, {
      body: `fields *, cover.*, platforms.*, genres.*;
            where name ~ "${q}"* & themes != (42);
            limit 10;`,
    });
  }

  async getCover(id: number) {
    return this.post(`covers`, {
      body: `fields alpha_channel, animated, checksum, game,  game_localization, height, image_id, url, width;
            where game=${id};`,
    });
  }
}

export default GameAPI;
