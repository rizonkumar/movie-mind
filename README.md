# Movie-Mind

Movie-Mind is a comprehensive React-based web application for exploring movies, TV shows, and people in the entertainment industry. It leverages the TMDB API to provide up-to-date information on trending and popular content, as well as detailed information on specific titles and individuals.

## Live Demo: https://movie-mind-rizon.netlify.app/

## Key Features

1. **Dynamic Content Browsing**

   - Trending movies and TV shows
   - Popular content across categories
   - Dedicated sections for Movies, TV Shows, and People

2. **Advanced Filtering**

   - Category-based filtering (e.g., popular, top-rated, upcoming, now playing for movies)
   - Time-based filtering for trending content (day/week)

3. **Infinite Scrolling**

   - Seamless loading of additional content as the user scrolls

4. **Detailed Information Pages**

   - In-depth details for movies, TV shows, and people
   - Includes recommendations, similar content, and external IDs

5. **Responsive Design**

   - Tailwind CSS for a mobile-friendly, adaptive layout

6. **State Management**

   - Redux for efficient state management across the application

7. **Error Handling and Loading States**

   - Custom error displays for better user experience
   - Shimmer effects during content loading

8. **Search Functionality**

   - Global search bar for finding specific content

9. **Video Integration**

   - Trailer viewing capability for movies and TV shows

10. **Watch Providers**

    - Information on where to watch content (region-specific)

11. **Multi-language Support**

    - Translations available for content descriptions

12. **External Links**
    - Links to social media and other external platforms for more information

## Folder Structure

```plaintext
MOVIE-MIND/
│
├── public/
│
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Cards/
│   │   │   ├── ErrorDisplay/
│   │   │   ├── Filtering/
│   │   │   ├── Headers/
│   │   │   ├── HorizontalCards/
│   │   │   └── Navigation/
│   │   ├── Home/
│   │   ├── MovieDetails/
│   │   ├── Movies/
│   │   ├── People/
│   │   ├── PeopleDetail/
│   │   ├── Popular/
│   │   ├── Trending/
│   │   ├── TVDetail/
│   │   └── TvShows/
│   ├── store/
│   │   ├── actions/
│   │   │   ├── movieActions.jsx
│   │   │   ├── personActions.jsx
│   │   │   └── tvShowActions.jsx
│   │   └── reducers/
│   │       ├── movieSlice.jsx
│   │       ├── personSlice.jsx
│   │       └── tvShowSlice.jsx
│   ├── utils/
│   │   └── axios.jsx
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
│
├── .gitignore
├── index.html
├── package.json
├── README.md
└── vite.config.js
```

## Installation and Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/movie-mind.git
   ```

2. Navigate to the project directory:

   ```bash
   cd movie-mind
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Create a `.env` file in the root directory and add your TMDB API token:

   ```plaintext
   VITE_TMDB_API_TOKEN=your_api_token_here
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

## Usage

After starting the development server, open your browser and navigate to `http://localhost:5173` (or the port specified by Vite).

Navigate through the application using the sidebar menu:

- **Home**: Overview of trending and popular content
- **Trending**: Latest trending movies and TV shows
- **Popular**: Most popular movies and TV shows
- **Movies**: Browse and filter movies
- **TV Shows**: Browse and filter TV shows
- **People**: Explore information about actors and crew members

Use the search bar in the top navigation to find specific content across all categories.

## Technologies Used

- React 18
- Redux Toolkit for state management
- React Router for navigation
- Axios for API requests
- Tailwind CSS for styling
- Vite as the build tool and development server

## API Integration

This project uses the TMDB (The Movie Database) API. You'll need to sign up for an API key at [The Movie Database API](https://www.themoviedb.org/documentation/api) to run the application locally.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Acknowledgements

- [The Movie Database (TMDB)](https://www.themoviedb.org/) for providing the API
- [React](https://reactjs.org/)
- [Redux](https://redux.js.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vite](https://vitejs.dev/)

```

```
