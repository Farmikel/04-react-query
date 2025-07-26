import axios from "axios";
import type { Movie } from "../types/movie";

const tmdbAPI = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
  },
});

export interface MovieAPIResponse {
  results: Movie[];
  total_pages: number;
}

export async function fetchMovies(
  query: string,
  page: number = 1
): Promise<MovieAPIResponse> {
  try {
    const response = await tmdbAPI.get<MovieAPIResponse>("/search/movie", {
      params: {
        query,
        include_adult: false,
        language: "en-US",
        page,
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error fetching movies:", error.message);
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
      }
    } else {
      console.error("Unexpected error fetching movies:", error);
    }
    throw new Error("Failed to fetch movies");
  }
}