import { AugmentedRequest, RESTDataSource } from "@apollo/datasource-rest";
import { ValueOrPromise } from "@apollo/datasource-rest/dist/RESTDataSource";

class GameAPI extends RESTDataSource {
  override baseURL = "https://api.igdb.com/v4/";

  protected willSendRequest(
    path: string,
    request: AugmentedRequest
  ): ValueOrPromise<void> {
    console.log("willSendRequest: ", path);
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

  async getGame(id: number) {
    return this.post(`games`, {
      body: `fields *, cover.*, platforms.*, genres.*, release_dates.*;
            where id=${id};`,
    });
  }

  async getPlatformLogo(id: number) {
    return this.post(`platform_logos`, {
      body: `fields alpha_channel, animated, checksum, height, image_id, url, width;
            where image_id=${id};`,
    });
  }

  getAuthToken() {
    return this.post(
      `https://id.twitch.tv/oauth2/token?client_id=${process.env.TWITCH_CLIENT_ID}&client_secret=${process.env.TWITCH_SECRET}&grant_type=client_credentials`
    );
  }
}

export default GameAPI;
