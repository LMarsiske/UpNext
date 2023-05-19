import gql from "graphql-tag";

export const typeDef = gql`
  type Movie {
    adult: Boolean
    backdrop_path: String
    genre_ids: [Int]
    id: Int
    original_language: String
    original_title: String
    overview: String
    popularity: Float
    poster_path: String
    release_date: String
    title: String
    video: Boolean
    vote_average: Float
    vote_count: Int
  }

  extend type Query {
    searchMovies(q: String!): [SearchResult]
  }
`;

export const resolvers = {
  Query: {
    searchMovies: async (_: any, { q }: any, { dataSources }: any) => {
      const res = await dataSources.movieAPI.search(q);
      return res.results.slice(0, 10).map((movie: any) => ({
        id: movie.id,
        type: "movie",
        title: movie.title,
        poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        summary: movie.overview,
      }));
    },
  },
};
