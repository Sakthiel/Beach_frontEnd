import { useEffect, useState } from "react";
import axios from "axios";
import styles from './styles/movieListStyles';
import {Link} from "react-router-dom";
import moment from "moment";
import { authHeader } from "../helper/authService";
const MovieList = () => {
    const [movies , setMovies] = useState([]);
    const classes = styles() ;
    const todayDate = moment().format("YYYY-MM-DD")
    useEffect(() => {
        async function fetchData() {
            try{
                const response = await axios.get("http://localhost:8080/movies" , authHeader());
                setMovies(response.data);
                console.log(response.data);

            }
            catch(err){
                console.log(err);
            }
        };
        fetchData();
    } , []);

    return(
    <div>
         <h1>
            MovieList Page
        </h1>
    <div className={classes.movieList}>
        {console.log(movies)}
    {
        movies.map((item,index) => {
            return(
                <Link key = {index} to = {{pathname : `/show/${item.id}/2023-10-02` } } className= {classes.link} >
                <div  className={classes.card}>
                    <img src={item.poster} alt = "poster" style={{width : '100%' , height: '80%'}}></img>
                    <h4>{item.name}</h4>
                    <p>{item.genre}</p>
                    <p>Rating : {item.rating} / 10</p>
                </div>
                </Link>
            )
        })

    }
    </div>
    </div>)
}

export default MovieList;