import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { ApolloServer } from "@apollo/server";
import { gql } from "graphql-tag";
import { NextRequest } from "next/server";
import TvAPI from "@/app/api/graphql/apis/tv-api";
import schema from "./schema/schema";

const resolvers = {
  Query: {
    hello: () => "world",
    search: async (_: any, { q }: any, { dataSources }: any) => {
      return await dataSources.tvAPI.search(q);
    },
    getGirls: async (_: any, __: any, { dataSources }: any) => {
      return await dataSources.tvAPI.getGirls();
    },
  },
};

const typeDefs = [
  gql`
    type Query {
      hello: String
      search(q: String): [ShowResult]
      getGirls: [ShowResult]
    }
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
    type Query {
      hello: String
      search(q: String): [ShowResult]
    }
  `,
];

// const server = new ApolloServer(schema);

const Schema = { typeDefs, resolvers };
const server = new ApolloServer(Schema);

const handler = startServerAndCreateNextHandler<NextRequest>(server, {
  context: async (req: NextRequest) => ({
    req,
    dataSources: {
      tvAPI: new TvAPI({ cache: server.cache }),
    },
  }),
});

export async function GET(request: Request) {
  return handler(request);
}

export async function POST(request: Request) {
  return handler(request);
}
