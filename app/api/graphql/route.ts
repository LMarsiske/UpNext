import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { ApolloServer } from "@apollo/server";
import { NextRequest } from "next/server";
import TvAPI from "@/app/api/graphql/apis/tv-api";
import MovieAPI from "./apis/movie-api";
import GameAPI from "./apis/game-api";
import schema from "./schema/schema";
import prisma from "@/lib/prisma";

const server = new ApolloServer({
  schema: schema,
  logger: console,
});

const handler = startServerAndCreateNextHandler<NextRequest>(server, {
  context: async (req: NextRequest) => {
    const token = req.headers.get("authorization") || "";
    const session = await prisma.session.findUnique({
      where: {
        sessionToken: token,
      },
    });

    let userExists = !!(await prisma.user.findFirst({
      where: {
        id: session?.userId,
      },
    }));

    let uid = userExists ? session?.userId : null;
    console.log(!!session, userExists, uid);

    return {
      req,
      dataSources: {
        tvAPI: new TvAPI({ cache: server.cache }),
        movieAPI: new MovieAPI({ cache: server.cache }),
        gameAPI: new GameAPI({ cache: server.cache }),
      },
      prisma,
      uid,
    };
  },
});

export async function GET(request: Request) {
  return handler(request);
}

export async function POST(request: Request) {
  return handler(request);
}
