import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { ApolloServer } from "@apollo/server";
import { NextRequest } from "next/server";
import TvAPI from "@/app/api/graphql/apis/tv-api";
import MovieAPI from "./apis/movie-api";
import GameAPI from "./apis/game-api";
import schema from "./schema/schema";

const server = new ApolloServer({ schema });

const handler = startServerAndCreateNextHandler<NextRequest>(server, {
  context: async (req: NextRequest) => ({
    req,
    dataSources: {
      tvAPI: new TvAPI({ cache: server.cache }),
      movieAPI: new MovieAPI({ cache: server.cache }),
      gameAPI: new GameAPI({ cache: server.cache }),
    },
  }),
});

export async function GET(request: Request) {
  return handler(request);
}

export async function POST(request: Request) {
  return handler(request);
}
