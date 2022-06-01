import React ,{useEffect, useState} from 'react'
import axios from '../../axios'
import "./RowPost.css";
import { API_KEY, imageURL} from '../../Constants/Constants'
import Youtube from 'react-youtube'

function RowPost(props) {
  const [movies, setMovies] = useState([])
  const [urlId, setUrlId] = useState([])  
  useEffect(()=>{
    axios.get(props.url).then((response)=>{
      console.log(response.data);
      setMovies(response.data.results)
    }).catch(err=>{
      alert('Network Error');
    })
  }, [])

  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },    
  };

  const handleMovieTrailer = (id)=>{
axios.get(`/movie/${297762}/videos?api_key=${API_KEY}&language=en-US`).then(response => {
  if(response.data.results.length !== 0){
    setUrlId(response.data.results[0])
  }
})
  }

  return (
    <div className='row'>
        <h2>{props.title}</h2>
        <div className='posters'>
          {movies.map((obj)=>
            <img onClick={handleMovieTrailer(obj.id)} key={obj.id} className={props.isSmall ? 'smallPoster' : 'poster' }src={`${imageURL + obj.backdrop_path}`}></img>
          )}                       
        </div>
       {urlId && <Youtube opts={opts} videoId={urlId.key}></Youtube>} 
    </div>
  )
}

export default RowPost