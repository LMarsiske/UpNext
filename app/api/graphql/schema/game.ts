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
    id: Int
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
    platforms: [String]
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
    release_year: String
    poster: String
    title: String
  }

  extend type Query {
    searchGames(q: String!): [SearchResult]
    getGame(id: String!): Game
    getIGDBAuthToken: String
  }
`;

export const resolvers = {
  Query: {
    searchGames: async (
      _: any,
      { q }: any,
      { dataSources, igdbToken }: any
    ) => {
      let games = await dataSources.gameAPI.search(q);
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
    getGame: async (_: any, { id }: any, { dataSources }: any) => {
      let res = await dataSources.gameAPI.getGame(id);
      const game = res[0];
      if (!game) return null;
      let release_year = Math.min(
        ...game.release_dates.reduce((total: any, current: any) => {
          if (current.y) {
            total.push(current.y);
          }
          return total;
        }, [])
      );

      return {
        id: game.id,
        age_ratings: game.age_ratings,
        aggregated_rating: game.aggregated_rating,
        aggregated_rating_count: game.aggregated_rating_count,
        alternative_names: game.alternative_names,
        artworks: game.artworks,
        bundles: game.bundles,
        category: game.category,
        checksum: game.checksum,
        collection: game.collection,
        cover: game.cover,
        created_at: game.created_at,
        dlcs: game.dlcs,
        expanded_games: game.expanded_games,
        expansions: game.expansions,
        external_games: game.external_games,
        first_release_date: game.first_release_date,
        follows: game.follows,
        forks: game.forks,
        franchise: game.franchise,
        franchises: game.franchises,
        game_engines: game.game_engines,
        game_localizations: game.game_localizations,
        game_modes: game.game_modes,
        genres: game.genres,
        hypes: game.hypes,
        involved_companies: game.involved_companies,
        keywords: game.keywords,
        language_supports: game.language_supports,
        multiplayer_modes: game.multiplayer_modes,
        name: game.name,
        parent_game: game.parent_game,
        platforms: game.platforms.map((platform: any) => platform.name),
        player_perspectives: game.player_perspectives,
        ports: game.ports,
        rating: game.rating,
        rating_count: game.rating_count,
        release_dates: game.release_dates,
        remakes: game.remakes,
        remasters: game.remasters,
        screenshots: game.screenshots,
        similar_games: game.similar_games,
        slug: game.slug,
        standalone_expansions: game.standalone_expansions,
        status: game.status,
        storyline: game.storyline,
        summary: game.storyline,
        tags: game.tags,
        themes: game.themes,
        total_rating: game.total_rating,
        total_rating_count: game.total_rating_count,
        updated_at: game.updated_at,
        url: game.url,
        version_parent: game.version_parent,
        version_title: game.version_title,
        videos: game.videos,
        websites: game.websites,
        title: game.name,
        release_year: release_year,
        poster: game.cover?.url ? `https:${game.cover.url}` : undefined,
      };
    },
    getIGDBAuthToken: async (_: any, __: any, { dataSources }: any) => {
      const res = await dataSources.gameAPI.getAuthToken();
      return res.access_token;
    },
  },
};
