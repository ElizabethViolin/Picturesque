# Picturesque

### Deployed application:
https://picturesque-tau.vercel.app/


Picturesque is a web application that allows users to search for images and view image details using the Pixabay API.  

- **Frontend**: Next.js, TypeScript, TailwindCSS
- **External API**: Pixabay
- **Code Quality Tools**: ESLint, Prettier

## Features

- **Image Search**: Search for images using the Pixabay API.
- **Infinite Scroll**: Continuously load more images as you scroll down the page.
- **Masonry Layout**: Images displayed in a responsive grid layout.
- **Image Details**: View detailed information about each image.
- **Code Quality**: Enforced with ESLint and Prettier.



## Getting Started

To get a local copy up and running, follow these steps:

### Installation

1. Clone the repository:
 ```sh
 git clone https://github.com/your-username/picturesque.git
 cd picturesque
 ```

2. Install the dependencies:
 ```sh
 npm install
 ```
### Pixabay API Key
To run the application locally, you need to obtain an API key from Pixabay:

  1. Go to the Pixabay API website and sign up for an account.

  2. Generate an API key.

### Running the Application

  1. Create a `.env.local` file in the root of your project and add your Pixabay API key:
 ```sh
 PIXABAY_API_KEY=your_api_key_here
 ```

  2. Run the application:
 ```sh
 npm run dev
 ```

  3. Open http://localhost:3000 with your browser to see the result.
