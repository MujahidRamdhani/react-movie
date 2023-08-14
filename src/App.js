import './App.css';
import { getMovieList, searchMovie } from './api';
import { useEffect, useState } from 'react';

const App = () => {
  const [popularMovies, setpopularMovies] = useState([])
  useEffect(() => {
   getMovieList().then((result) => {
    setpopularMovies(result)
   })
  }, [])

  const PopularMovieList = () => {
    return popularMovies.map((movie, i) => { 
      return (
       
            <div className={'Movie-wrapper'} key={i}>
                <div className={'Movie-title'}>{movie.title}</div>
                <img alt="" className={'Movie-img'} src={`${process.env.REACT_APP_BAEIMGURL}/${movie.poster_path}`} />
                <div className={'Movie-date'}>{movie.release_date}</div>
                <div className={'Movie-rate'}>{movie.vote_average}</div>
            </div>
        )
    })
  }


  const search = async(q) => {
    if (q.length > 3) {
      const query = await searchMovie(q)
      setpopularMovies(query.results)
    }
  }
  
  return (
    <div className={'App'}>
      <header className={'App-header'}>
        <h1>Mujahid Movie Mania</h1>
        <input
         placeholder={'Cari film...'} 
         className={'Movie-search'}
         onChange={({target}) => search(target.value)}
         
         />
          <div className={'Movie-container'}>
           <PopularMovieList />
        </div>
      </header>
    </div>
  );
}

export default App;
