import React from "react";
import { PixabayImage } from "../types/pixabay";
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from "./ui/dialog";

interface DetailsDialogProps {
  image: PixabayImage;
}

// Dialog component to display image details
export default function DetailsDialog({ image }: DetailsDialogProps) {
  return (
    <div className="mb-6 rounded overflow-hidden shadow-lg">
      <Dialog>
        <DialogTrigger asChild>
          {/* eslint-disable @next/next/no-img-element */}
          <img
            src={image.webformatURL}
            alt={`Image by ${image.user} with tags: ${image.tags}`}
            className="cursor-pointer"
          />
        </DialogTrigger>
        <DialogContent>
          <div className="flex flex-col items-center justify-center p-4 space-y-4">
            <DialogTitle className="font-bold text-2xl">
              Posted by: {image.user}
            </DialogTitle>
            <ul>
              {image.tags.split(",").map((tag, index) => (
                <li
                  key={index}
                  className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2"
                >
                  #{tag.trim()}
                </li>
              ))}
            </ul>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
