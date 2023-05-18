"use client";

import React, { useState, useCallback, useEffect } from "react";
import { debounce } from "lodash";
import { SearchResult } from "./components/SearchResults";
import { useQuery, gql, useApolloClient } from "@apollo/client";
import "@/styles/globals.css";

interface ShowResult {
  score: number;
  show: {
    id: number;
    url: string;
    name: string;
    type: string;
    language: string;
    genres: string[];
    status: string;
    runtime: number;
    averageRuntime: number;
    premiered: string;
    ended: string;
    officialSite: string;
    schedule: {
      time: string;
      days: string[];
    };
    rating: {
      average: number;
    };
    weight: number;
    network: {
      id: number;
      name: string;
      country: {
        name: string;
        code: string;
        timezone: string;
      };
      officialSite: string;
    };
    webChannel: {
      id: number;
      name: string;
      country: {
        name: string;
        code: string;
        timezone: string;
      };
      officialSite: string;
    };
    dvdCountry: string;
    externals: {
      tvrage: number;
      thetvdb: number;
      imdb: string;
    };
    image: {
      medium: string;
      original: string;
    };
    summary: string;
    updated: number;
    _links: {
      self: {
        href: string;
      };
      previousepisode: {
        href: string;
      };
    };
  };
}

const HomePage = () => {
  // const client = useApolloClient();
  const [input, setInput] = useState("");
  const [results, setResults] = useState<ShowResult[]>([]);

  const queryAPI = useCallback(
    debounce(async (q) => {
      const res = await fetch(`https://api.tvmaze.com/search/shows?q=${q}`);
      const json = await res.json();
      console.log(json);
      setResults(json);
    }, 300),
    []
  );

  const handleChange = async ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setInput(value);
    if (value) {
      queryAPI(value);
    }
  };
  return (
    <main className="flex flex-col items-center mt-8">
      <h1 className="text-4xl">Search TV Shows</h1>
      <input
        className="text-xl"
        type="text"
        value={input}
        onChange={handleChange}
      />
      {results.map((result) => (
        <SearchResult key={result.show.id} {...result} />
      ))}
    </main>
  );
};
export default HomePage;
