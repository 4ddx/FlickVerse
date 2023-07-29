import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Tv = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.themoviedb.org/3/tv/popular?api_key=2ba6edcaaa42bee1b424fac71c312fa9&language=en-US&page=1');
        setMovies(response.data.results);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  const closeModal = () => {
    setSelectedMovie(null);
  };

  return (
    <div className='flex flex-col w-full p-5 gap-2'>
      <div className='font-bold ml-1 pb-3 text-3xl hover:text-red-300 duration-300'>TV Shows</div>
      <div className='w-full overflow-x-auto hide-scrollbar'>
        <div className='flex flex-row gap-4 h-[300px]' style={{ minWidth: `${movies.length * 120}px` }}>
          {movies.map((movie) => (
            <div
              key={movie.id}
              className='h-[200px] w-[150px] flex-shrink-0 hover:scale-105 duration-300 cursor-pointer'
              onClick={() => handleMovieClick(movie)}
            >
              <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt={movie.name} />
              <h1>{movie.name}</h1>
            </div>
          ))}
        </div>
      </div>
      {selectedMovie && (
        <div className='fixed top-0 left-0 w-screen h-screen bg-opacity-80 bg-black flex justify-center items-center'>
          <div className='bg-black p-4'>
            <div className='flex flex-row justify-between p-2 items-center'>
            <div className='flex flex-col items-start justify-evenly max-w-[400px]'>
            <h2 className='text-xl font-bold mb-2'>{selectedMovie.name}</h2>
            <p>{selectedMovie.overview}</p>
            </div>
            <img className='h-[200px] w-[200px]' src={`https://image.tmdb.org/t/p/original/${selectedMovie.poster_path}`}/>
            </div>
            <button className='bg-red-400 text-white px-4 py-2 mt-4' onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tv;
