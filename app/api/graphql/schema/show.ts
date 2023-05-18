import gql from "graphql-tag";
export const typeDef = gql`
  type Schedule {
    time: String
    days: [String]
  }
  type Rating {
    average: Float
  }
  type Country {
    name: String
    code: String
    timezone: String
  }

  type Network {
    id: Int
    name: String
    country: Country
    officialSite: String
  }

  type WebChannel {
    id: Int
    name: String
    country: Country
    officialSite: String
  }

  type Externals {
    tvrage: Int
    thetvdb: Int
    imdb: String
  }

  type Image {
    medium: String
    original: String
  }

  type Self {
    href: String
  }

  type PreviousEpisode {
    href: String
  }
  type Links {
    self: Self
    previousepisode: PreviousEpisode
  }

  type Show {
    id: ID
    url: String
    name: String
    type: String
    language: String
    genres: [String]
    status: String
    runtime: Int
    averageRuntime: Int
    premiered: String
    ended: String
    officialSite: String
    schedule: Schedule
    rating: Rating
    weight: Int
    network: Network
    webChannel: WebChannel
    dvdCountry: String
    externals: Externals
    image: Image
    summary: String
    updated: Int
    _links: Links
  }

  type ShowResult {
    score: Int
    show: Show
  }

  extend type Query {
    hello: String
    search(q: String): [ShowResult]
    getGirls: [ShowResult]
  }
`;

export const resolvers = {
  Query: {
    search: async (_: any, { q }: any, { dataSources }: any) => {
      return await dataSources.tvAPI.search(q);
    },
    getGirls: async (_: any, __: any, { dataSources }: any) => {
      return await dataSources.tvAPI.getGirls();
    },
    hello: () => "world",
  },
};
