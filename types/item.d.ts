import type { item } from "@prisma/client";

export interface TVShow extends item {
  cast: CastMember[];
  providers: Provider[];
  release_year: string;
}

export interface Movie extends item {
  cast: CastMember[];
  providers: Provider[];
  release_year: string;
}

export interface Game extends item {
  cast: CastMember[];
  providers: Provider[];
  release_year: string;
}

export interface CastMember {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
}

export interface Provider {
  id: number;
  logo: string;
  name: string;
}
