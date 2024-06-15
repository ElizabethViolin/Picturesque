"use client";

import React, { useState } from 'react';
import DetailsDialog from '@/components/DetailsDialog';
import SearchBar from '@/components/SearchBar';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useImageFetcher } from '@/hooks/useImageFetcher';

// Home page component to display images
export default function HomePage() {
  const [term, setTerm] = useState<string>('');
  const [page, setPage] = useState<number>(1);

  const { images, isLoading, hasMore, error } = useImageFetcher(term, page);

  const fetchMoreImages = () => setPage((prevPage) => prevPage + 1);

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
        
        <InfiniteScroll
          dataLength={images.length}
          next={fetchMoreImages}
          hasMore={hasMore}
          loader={<h4 className="text-center">Loading more images...</h4>}
          endMessage={
            <p className="text-center">
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          <div className="flex flex-wrap justify-center">
            {images.map((image) => (
              <div key={image.id} className="m-2">
                <DetailsDialog image={image} />
              </div>
            ))}
          </div>
        
        </InfiniteScroll>
      </main>
    </div>
  );
}
