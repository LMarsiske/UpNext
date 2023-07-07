"use client";

import React, { useState, useCallback, useEffect } from "react";
import { debounce } from "lodash";
import { SearchResult } from "./components/SearchResults";
import { useQuery, useLazyQuery, gql } from "@apollo/client";
import { useSession } from "next-auth/react";
import "@/styles/globals.css";
import SearchResultSkeletons from "./components/SearchResultSkeletons";

import { flatten, sortBy } from "lodash";

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

const USER = gql`
  query User($id: String) {
    getUser(id: $id) {
      id
      email
      name
      createdAt
      updatedAt
      lists {
        id
        name
      }
    }
  }
`;

const HomePage = () => {
  const { data: session } = useSession();
  console.log(session);
  const [input, setInput] = useState("");
  const [loadingPage, setLoadingPage] = useState(true);
  const [results, setResults] = useState<GraphSearchResult[]>([]);
  const [search, { loading, data, error }] = useLazyQuery(SEARCH);
  const {
    data: userData,
    loading: userLoading,
    error: userError,
  } = useQuery(USER, {
    variables: { id: session?.user?.id },
    skip: !session?.user?.id,
  });

  useEffect(() => {
    if (data) {
      const { searchGames, searchMovies, searchTV } = data;
      const results = sortBy(
        flatten([...searchGames, ...searchMovies, ...searchTV]),
        "title"
      );
      setResults(results);
    }
  }, [loading, data, error]);

  useEffect(() => {
    if (userData) {
      console.log(userData);
    }
  }, [userData]);

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
      </div>
      <div className="w-8/12">
        {loading ? (
          <SearchResultSkeletons />
        ) : (
          results.map((result, index) => (
            <SearchResult key={result.id || index} {...result} />
          ))
        )}
      </div>
    </main>
  );
};
export default HomePage;
