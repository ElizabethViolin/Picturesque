import React, { useState, ChangeEvent, FormEvent } from "react";
import Image from "next/image";

interface SearchBarProps {
  searchText: (text: string) => void;
  clearSearch: () => void;
  term: string;
}

// Search bar component for handling user input
export default function SearchBar({
  searchText,
  clearSearch,
  term,
}: SearchBarProps) {
  const [text, setText] = useState<string>("");

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    searchText(text);
    setText("");
  };

  const onClear = () => {
    setText("");
    clearSearch();
  };

  return (
    <div className="max-w-lg rounded overflow-hidden my-10 mx-auto">
      <form onSubmit={onSubmit} className="w-full max-w-lg">
        <div className="flex items-center border border-gray-300 p-2 shadow-sm rounded-lg bg-white">
          <input
            value={text}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setText(e.target.value)
            }
            className="appearance-none bg-transparent border-none w-full text-gray-800 mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="text"
            placeholder="Search images..."
          />
          <button
            className="flex-shrink-0 text-gray-500 hover:text-gray-700 p-2 rounded-full"
            type="submit"
          >
            <Image src={"/search.svg"} alt={"search"} width={20} height={20} />
          </button>
        </div>
      </form>
      {term && (
        <button
          onClick={onClear}
          className="w-full flex justify-center items-center hover:underline mt-2 text-sm"
        >
          Clear
        </button>
      )}
    </div>
  );
}
