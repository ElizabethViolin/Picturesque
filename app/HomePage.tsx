"use client";

import React, { useState } from 'react';
import Masonry from 'react-masonry-css';
import DetailsDialog from '../components/DetailsDialog';
import SearchBar from '../components/SearchBar';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useImageFetcher } from '@/hooks/useImageFetcher';
import { breakpointColumnsObj } from '@/config/masonryConfig';

// Home page component to display images in a masonry layout and with infinite scroll
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
    <div className="container mx-auto p-4">
      <SearchBar searchText={(text) => setTerm(text)} clearSearch={clearSearch} term={term} />

      {error && <h1 className="text-4xl text-center mx-auto mt-32">Error: {error}</h1>}

      {!isLoading && images.length === 0 && !error && (
        <h1 className="text-4xl text-center mx-auto mt-32">No Images Found</h1>
      )}

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
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="flex w-auto -ml-4"
            columnClassName="pl-4 bg-clip-padding"
          >
            {images.map((image) => (
              <DetailsDialog key={image.id} image={image} />
            ))}
          </Masonry>
        </InfiniteScroll>
    </div>
  );
}
