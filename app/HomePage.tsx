"use client";

import React, { useState } from 'react';
import { useImageFetcher } from '@/hooks/useImageFetcher';
import SearchBar from '@/components/SearchBar';

// Home page component to display images
export default function HomePage() {
  const [term, setTerm] = useState<string>('');
  const [page, setPage] = useState<number>(1);

  const { images, isLoading, error } = useImageFetcher(term || 'popular', page);

  const clearSearch = () => {
    setTerm('');
    setPage(1);
  };

  return (
    <div className="min-h-screen">
      <SearchBar searchText={(text) => setTerm(text)} clearSearch={clearSearch} term={term} />

      <main className="p-4">
        {isLoading && <p className="text-center">Loading...</p>}
        {error && <p className="text-center text-red-500">Error: {error}</p>}
        <div className="flex flex-wrap justify-center">
          {images.map((image) => (
            <div key={image.id} className="m-2">
              {/* eslint-disable @next/next/no-img-element */}
              <img
                src={image.webformatURL}
                alt={image.tags}
                className="w-60 h-60 rounded-lg"
              />
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-4">
          <button
            onClick={() => setPage(page + 1)}
            className="p-2 bg-blue-500 text-white rounded"
          >
            Load More
          </button>
        </div>
      </main>
    </div>
  );
}
