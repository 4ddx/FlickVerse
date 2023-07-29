import { useState } from 'react';

const MovieSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]);
  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const searchMovies = async () => {
    if (!searchTerm) {
      alert('Please enter a movie name.');
      return;
    }

    try {
      const url = `https://api.themoviedb.org/3/search/movie?api_key=2ba6edcaaa42bee1b424fac71c312fa9&query=${encodeURIComponent(
        searchTerm
      )}`;

      const response = await fetch(url);
      const data = await response.json();
      setMovies(data.results);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className='flex flex-col w-full items-center justify-center mt-5'>
      <div className='flex flex-row'>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchInputChange}
        placeholder="Enter movie name..."
        className='p-2 text-black outline-none'
      />
      <button onClick={searchMovies} className='bg-neutral-500 p-2'>Go</button>
      </div>

      <div className='flex flex-col w-full items-center justify-center gap-4'>
        {movies.length === 0 && <p></p>}
        {movies.map((movie) => (
          <div key={movie.id} className='flex flex-col p-2 border'>
            <h2 className='text-3xl font-bold'>{movie.title}</h2>
            <div className='flex flex-row items-center gap-10'>
            <p className='max-w-[400px]'>{movie.overview}</p>
            {movie.poster_path && (
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={`${movie.title} poster`} className='w-[200px] h-[200px]'
              />)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieSearch;
