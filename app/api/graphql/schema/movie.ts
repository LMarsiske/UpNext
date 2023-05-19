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
    hello: String
    getJackReacher: Movie
    searchMovies(q: String!): [Movie]
  }
`;

export const resolvers = {
  Query: {
    searchMovies: async (_: any, { q }: any, { dataSources }: any) => {
      const res = await dataSources.movieAPI.search(q);
      return res.results.slice(0, 10);
    },
    getJackReacher: async (_: any, __: any, { dataSources }: any) => {
      await dataSources.movieAPI.getJackReacher();
    },
    hello: () => "world",
  },
};
