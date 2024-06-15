import { useCallback, useEffect, useState } from 'react';
import { PixabayImage } from '../types/pixabay';

// Custom hook to fetch images from the API
export const useImageFetcher = (term: string, page: number) => {
  const [images, setImages] = useState<PixabayImage[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchImages = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    const searchTerm = term || 'popular'; 
    const query = new URLSearchParams({ term: searchTerm, page: page.toString() }).toString();
    const url = `/api/images?${query}`;

    try {
      const res = await fetch(url);

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to fetch images');
      }

      const data = await res.json();

      if (data.hits && Array.isArray(data.hits)) {
        setImages((prevImages) => (page === 1 ? data.hits : [...prevImages, ...data.hits]));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  }, [term, page]);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  return { images, isLoading, error };
};
