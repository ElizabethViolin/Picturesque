"use client";

import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useImageFetcher } from '@/hooks/useImageFetcher';

// Home page component to display images
export default function HomePage() {
  const [term, setTerm] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [text, setText] = useState<string>('');

  const { images, isLoading, error } = useImageFetcher(term || 'popular', page);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTerm(text);
    setPage(1); 
  };

  return (
    <div className="min-h-screen">
      <header className="p-4 bg-white shadow">
        <form onSubmit={handleSubmit} className="flex items-center space-x-2">
          <input 
            value={text}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setText(e.target.value)} 
            className="border-2" 
            type="text" 
            placeholder="Search images..." 
          />
          <button type="submit" className="p-2 bg-blue-500 text-white rounded">
            Search
          </button>
        </form>
      </header>
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
