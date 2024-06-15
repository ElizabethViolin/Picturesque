import { useCallback, useEffect, useState } from "react";
import { PixabayImage } from "../types/pixabay";
import queryString from "query-string";

// Custom hook to fetch images from the API
export const useImageFetcher = (term: string, page: number) => {
  const [images, setImages] = useState<PixabayImage[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchImages = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    const query = queryString.stringify({ term, page });
    const url = `/api/images?${query}`;

    try {
      const res = await fetch(url);

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to fetch images");
      }

      const data = await res.json();

      if (data.hits && Array.isArray(data.hits)) {
        setImages((prevImages) => [...prevImages, ...data.hits.slice(0, 20)]);
        setHasMore(data.hits.length === 21);
      } else {
        setHasMore(false);
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred",
      );
      setHasMore(false);
    } finally {
      setIsLoading(false);
    }
  }, [term, page]);

  useEffect(() => {
    setImages([]);
    setHasMore(true);
    setIsLoading(true);
  }, [term]);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  return { images, isLoading, hasMore, error };
};
