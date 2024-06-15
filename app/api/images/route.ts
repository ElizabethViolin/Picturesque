import { NextRequest, NextResponse } from "next/server";
import queryString from "query-string";

// Handle GET requests to the images API route
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const term = searchParams.get("term") || "popular";
  const page = searchParams.get("page") || "1";

  // Construct the Pixabay API URL
  const url = queryString.stringifyUrl({
    url: "https://pixabay.com/api/",
    query: {
      key: process.env.PIXABAY_API_KEY,
      image_type: "photo",
      page,
      per_page: "21",
      q: term,
    },
  });

  try {
    const response = await fetch(url);

    if (!response.ok) {
      // Log and return error from Pixabay API
      const errorData = await response.json();
      console.error(`Error from Pixabay API: ${errorData.message}`);
      return NextResponse.json(
        { message: errorData.message },
        { status: response.status },
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    // Log and return internal server error
    console.error(`Internal Server Error: ${error}`);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
