import gql from "graphql-tag";
import { isEmpty } from "lodash";

export const typeDef = gql`
  type CastMember {
    adult: Boolean
    gender: Int
    id: Int
    known_for_department: String
    name: String
    original_name: String
    popularity: Float
    profile_path: String
    cast_id: Int
    character: String
    credit_id: String
    order: Int
  }
  type Provider {
    id: Int
    logo: String
    name: String
  }
  type Movie {
    adult: Boolean
    backdrop_path: String
    genre_ids: [Int]
    id: Int
    original_language: String
    original_title: String
    summary: String
    popularity: Float
    poster: String
    release_date: String
    release_year: String
    title: String
    video: Boolean
    vote_average: Float
    vote_count: Int
    cast: [CastMember]
    providers: [Provider]
  }

  extend type Query {
    searchMovies(q: String!): [SearchResult]
    getMovie(id: String!): Movie
  }
`;

export const resolvers = {
  Query: {
    searchMovies: async (_: any, { q }: any, { dataSources }: any) => {
      console.log("searching movies");
      const res = await dataSources.movieAPI.search(q);
      if (!res) return [];
      return res.results.slice(0, 10).map((movie: any) => ({
        id: movie.id,
        type: "movie",
        title: movie.title,
        poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        summary: movie.overview,
      }));
    },
    getMovie: async (_: any, { id }: any, { dataSources }: any) => {
      const res = await dataSources.movieAPI.getMovie(id);
      const credits = await dataSources.movieAPI.getCredits(id);
      const providers = await dataSources.movieAPI.getProviders(id);

      console.log(providers);

      let providerList: any[] = [];
      if (
        providers?.results &&
        !isEmpty(providers?.results) &&
        providers.results.US &&
        !isEmpty(providers?.results?.US) &&
        providers?.results?.US?.flatrate &&
        !isEmpty(providers?.results?.US?.flatrate)
      ) {
        providers.results.US.flatrate.map((provider: any) => ({
          id: provider.provider_id,
          logo: `https://image.tmdb.org/t/p/w500${provider.logo_path}`,
          name: provider.provider_name,
        }));
      }
      if (!res) return null;
      console.log(res);

      return {
        id: res.id,
        adult: res.adult,
        backdrop_path: res.backdrop_path,
        genre_ids: res.genre_ids,
        original_language: res.original_language,
        original_title: res.original_title,
        summary: res.overview,
        popularity: res.popularity,
        poster: `https://image.tmdb.org/t/p/w500${res.poster_path}`,
        release_date: res.release_date,
        release_year: res?.release_date?.split("-")[0] || "",
        title: res.title,
        video: res.video,
        vote_average: res.vote_average,
        vote_count: res.vote_count,
        cast: credits.cast.slice(0, 8),
        providers: providerList,
      };
    },
  },
};
