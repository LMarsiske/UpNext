import gql from "graphql-tag";

export const typeDef = gql`
  type Cover {
    alpha_channel: Boolean
    animated: Boolean
    checksum: String
    game: Int
    game_localization: Int
    height: Int
    image_id: String
    url: String
    width: Int
  }

  type Game {
    age_ratings: [Int]
    aggregated_rating: Float
    aggregated_rating_count: Int
    alternative_names: [Int]
    artworks: [Int]
    bundles: [Int]
    category: Int
    checksum: String
    collection: Int
    cover: Cover
    created_at: Int
    dlcs: [Int]
    expanded_games: [Int]
    expansions: [Int]
    external_games: [Int]
    first_release_date: Int
    follows: Int
    forks: [Int]
    franchise: Int
    franchises: [Int]
    game_engines: [Int]
    game_localizations: [Int]
    game_modes: [Int]
    genres: [Int]
    hypes: Int
    involved_companies: [Int]
    keywords: [Int]
    language_supports: [Int]
    multiplayer_modes: [Int]
    name: String
    parent_game: Int
    platforms: [Int]
    player_perspectives: [Int]
    ports: [Int]
    rating: Float
    rating_count: Int
    release_dates: [Int]
    remakes: [Int]
    remasters: [Int]
    screenshots: [Int]
    similar_games: [Int]
    slug: String
    standalone_expansions: [Int]
    status: Int
    storyline: String
    summary: String
    tags: [Int]
    themes: [Int]
    total_rating: Float
    total_rating_count: Int
    updated_at: Int
    url: String
    version_parent: Int
    version_title: String
    videos: [Int]
    websites: [Int]
  }

  extend type Query {
    searchGames(q: String!): [SearchResult]
  }
`;

export const resolvers = {
  Query: {
    searchGames: async (_: any, { q }: any, { dataSources }: any) => {
      let games = await dataSources.gameAPI.search(q);
      //   let gamesWithCovers = await Promise.all(
      //     games.map(async (game: any) => {
      //       if (!game.cover) return game;

      //       let cover = await dataSources.gameAPI.getCover(game.cover);
      //       return { ...game, cover };
      //     })
      //   );
      //   return gamesWithCovers;
      if (!games) return [];
      return games.map((game: any) => ({
        id: game.cover?.game,
        type: "game",
        title: game.name,
        poster: game.cover?.url ? `https:${game.cover.url}` : undefined,
        summary: game.summary,
        platforms: game.platforms?.map((platform: any) => platform.name),
        genres: game.genres?.map((genre: any) => genre.name),
      }));
    },
  },
};
