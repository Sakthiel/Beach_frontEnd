import axios from "axios";
import { useState , useEffect} from "react";
import { authHeader } from "../../helper/authService";
const useMovie= (movieId) => {
    const [movie ,setMovie] = useState({});
    const [movieLoading, setMovieLoading] = useState(true);
    useEffect(() => {
        async function fetchData() {
            try {
                console.log(authHeader());
                const response = await axios.get(`http://localhost:8080/movies/${movieId}`, authHeader());
                console.log(response.data);
                setMovie(response.data);
                setMovieLoading(false);
            }
            catch (err) {
                console.log(err);
            }
        };
        fetchData();

    }, [])

    return {
      movie : movie,
      movieLoading : movieLoading
    };
}

export default useMovie;