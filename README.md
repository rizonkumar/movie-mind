# Movie Mind

Movie Mind is a modern, responsive web application for discovering and exploring movies, TV shows, and entertainment personalities. Built with React and powered by The Movie Database (TMDB) API, it offers a sleek interface for browsing trending content, searching for titles, and accessing detailed information about various media.

## Features

- Browse trending movies, TV shows, and people
- Search functionality for finding specific titles or personalities
- Responsive design for optimal viewing on various devices
- Dynamic header with randomly selected trending content
- Categorized navigation for easy exploration

## Technologies Used

- React
- React Router for navigation
- Axios for API requests
- Tailwind CSS for styling
- TMDB API for movie and TV show data

## Getting Started

### Prerequisites

- Node.js (v18 or later recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/rizonkumar/movie-mind.git
   cd movie-mind
   ```

2. Install dependencies:
   ```
   npm install
   ```
   or if you're using yarn:
   ```
   yarn install
   ```

3. Create a `.env` file in the root directory and add your TMDB API key:
   ```
   REACT_APP_TMDB_API_KEY=your_api_key_here
   ```

4. Start the development server:
   ```
   npm start
   ```
   or
   ```
   yarn start
   ```

5. Open [http://localhost:3000](http://localhost:3000) to view the app in your browser.

## Project Structure

- `src/components/` - React components
  - `Home.js` - Main page component
  - `templates/` - Reusable template components
    - `Sidenav.js` - Sidebar navigation component
    - `Topnav.js` - Top navigation bar with search functionality
    - `Headers.js` - Dynamic header component
- `src/utils/` - Utility functions and configurations
  - `axios.js` - Axios instance for API calls

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Acknowledgments

- The Movie Database (TMDB) for providing the API
- The React community for excellent documentation and resources
```

This README provides an overview of your project, its features, the technologies used, setup instructions, and basic information about the project structure. You may want to adjust certain details like the repository URL, license information, or any specific instructions based on your project's needs.