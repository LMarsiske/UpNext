import gql from "graphql-tag";
import { stripHtml } from "string-strip-html";
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
    searchTV(q: String!): [SearchResult]
    getTV(id: String!): Show
  }
`;

export const resolvers = {
  Query: {
    searchTV: async (_: any, { q }: any, { dataSources }: any) => {
      let res = await dataSources.tvAPI.search(q);
      if (!res) return [];
      return res.map((show: any) => {
        let summary = show.show.summary;
        if (summary) {
          summary = stripHtml(summary).result;
        }
        return {
          id: show.show.id,
          type: "tv",
          title: show.show.name,
          poster: show.show.image?.original,
          summary: summary,
          network: show.show.network?.name,
        };
      });
    },
    getTV: async (_: any, { id }: any, { dataSources }: any) => {
      let res = await dataSources.tvAPI.getShow(id);
      if (!res) return null;
      console.log(res);
      let summary = res.summary;
      if (summary) {
        summary = stripHtml(summary).result;
      }
      return {
        id: res.id,
        url: res.url,
        name: res.name,
        type: res.type,
        language: res.language,
        genres: res.genres,
        status: res.status,
        runtime: res.runtime,
        averageRuntime: res.averageRuntime,
        premiered: res.premiered,
        ended: res.ended,
        officialSite: res.officialSite,
        schedule: res.schedule,
        rating: res.rating,
        weight: res.weight,
        network: res.network,
        webChannel: res.webChannel,
        dvdCountry: res.dvdCountry,
        externals: res.externals,
        image: res.image,
        summary: summary,
        updated: res.updated,
        _links: res._links,
      };
    },
  },
};
