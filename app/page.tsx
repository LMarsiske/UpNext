"use client";

import React, { useState, useCallback, useEffect } from "react";
import { debounce } from "lodash";
import { SearchResult } from "./components/SearchResults";
import { useLazyQuery, gql } from "@apollo/client";
import "@/styles/globals.css";
import LoadingPage from "./loading";

import { flatten, sortBy } from "lodash";

// interface ShowResult {
//   score: number;
//   show: {
//     id: number;
//     url: string;
//     name: string;
//     type: string;
//     language: string;
//     genres: string[];
//     status: string;
//     runtime: number;
//     averageRuntime: number;
//     premiered: string;
//     ended: string;
//     officialSite: string;
//     schedule: {
//       time: string;
//       days: string[];
//     };
//     rating: {
//       average: number;
//     };
//     weight: number;
//     network: {
//       id: number;
//       name: string;
//       country: {
//         name: string;
//         code: string;
//         timezone: string;
//       };
//       officialSite: string;
//     };
//     webChannel: {
//       id: number;
//       name: string;
//       country: {
//         name: string;
//         code: string;
//         timezone: string;
//       };
//       officialSite: string;
//     };
//     dvdCountry: string;
//     externals: {
//       tvrage: number;
//       thetvdb: number;
//       imdb: string;
//     };
//     image: {
//       medium: string;
//       original: string;
//     };
//     summary: string;
//     updated: number;
//     _links: {
//       self: {
//         href: string;
//       };
//       previousepisode: {
//         href: string;
//       };
//     };
//   };
// }

interface GraphSearchResult {
  id: number;
  type: string;
  title: string;
  poster: string;
  summary: string;
  network: string;
  platforms: string[];
  genres: string[];
}

const SEARCH = gql`
  query Search($q: String!) {
    searchGames(q: $q) {
      id
      type
      title
      poster
      summary
      network
      platforms
      genres
    }
    searchMovies(q: $q) {
      id
      type
      title
      poster
      summary
      network
      platforms
      genres
    }
    searchTV(q: $q) {
      id
      type
      title
      poster
      summary
      network
      platforms
      genres
    }
  }
`;

const HomePage = () => {
  const [input, setInput] = useState("");
  const [results, setResults] = useState<GraphSearchResult[]>([]);
  const [search, { loading, data, error }] = useLazyQuery(SEARCH);

  useEffect(() => {
    console.log(loading, data, error);
    if (data) {
      const { searchGames, searchMovies, searchTV } = data;
      const results = sortBy(
        flatten([...searchGames, ...searchMovies, ...searchTV]),
        "title"
      );
      setResults(results);
    }
  }, [loading, data, error]);

  const query = useCallback(
    debounce((q: string) => {
      search({ variables: { q } });
    }, 150),
    []
  );

  const handleChange = async ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setInput(value);
    if (value) query(value);
  };
  return (
    <main className="flex flex-col items-center mt-8">
      <h1 className="text-4xl">Search TV Shows</h1>
      <div className="flex">
        <input
          className="text-xl"
          type="text"
          value={input}
          onChange={handleChange}
        />
        <button
          className="text-xl"
          onClick={() => {
            console.log("searching");
            search({ variables: { q: input } });
          }}
        >
          Search
        </button>
      </div>
      <div className="w-50">
        {loading && <LoadingPage />}
        {results.map((result, index) => (
          <SearchResult key={result.id || index} {...result} />
        ))}
      </div>
    </main>
  );
};
export default HomePage;
