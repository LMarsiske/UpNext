import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { ApolloServer } from "@apollo/server";
import { NextRequest } from "next/server";
import TvAPI from "@/app/api/graphql/apis/tv-api";
import MovieAPI from "./apis/movie-api";
import GameAPI from "./apis/game-api";
import schema from "./schema/schema";
import prisma from "@/lib/prisma";
import { GraphQLError } from "graphql";

const server = new ApolloServer({ schema });

const handler = startServerAndCreateNextHandler<NextRequest>(server, {
  context: async (req: NextRequest) => {
    const token = req.headers.get("authorization") || "";
    console.log(token);
    const session = await prisma.session.findUnique({
      where: {
        sessionToken: token,
      },
    });
    if (!session) {
      throw new GraphQLError("Not authorized");
    }
    const user = await prisma.user.findUnique({
      where: {
        id: session.userId,
      },
    });
    if (!user) {
      throw new GraphQLError("User does not exist");
    }
    return {
      req,
      dataSources: {
        tvAPI: new TvAPI({ cache: server.cache }),
        movieAPI: new MovieAPI({ cache: server.cache }),
        gameAPI: new GameAPI({ cache: server.cache }),
      },
      prisma,
      user,
    };
  },
});

export async function GET(request: Request) {
  return handler(request);
}

export async function POST(request: Request) {
  return handler(request);
}
