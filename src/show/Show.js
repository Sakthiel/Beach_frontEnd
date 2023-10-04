import {useLocation} from 'react-router-dom'
const Show = () => {
    let location = useLocation();
    const {movie} = location.state;
    console.log(movie);

    return(
        <>
        
    <h1>Available shows</h1>
    <div>
                    <img src={movie.poster} alt = "poster" style={{width : '50%' , height: '10%'}}></img>
                    <h4>{movie.name}</h4>
                    <p>{movie.genre}</p>
                    <p>Rating : {movie.rating} / 10</p>
                </div>
                </>
    );
}
export default Show;
