import axios from "axios";
import { useState , useEffect} from "react";
import { authHeader } from "../../helper/authService";
import moment from "moment";

const useShow = (movieId , date) => {
    const [shows ,setShows] = useState([]);
    const [showsLoading, setShowsLoading] = useState(true);
    const [showsByScreen , setShowsByScreen] = useState({});
    const todayDate = moment().format("YYYY-MM-DD");
    console.log(date);
    const sortByScreen = (shows) => {
        return shows.reduce((acc, show) => {
            const screenName = show.screen.name;
            if (!acc[screenName]) {
                acc[screenName] = [];
            }
            acc[screenName].push(show);
            return acc;
        }, {});
    }
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(`http://localhost:8080/shows/${movieId}/${date}`, authHeader());
                console.log(response.data);
                setShows(response.data);
                setShowsByScreen(sortByScreen(response.data));
                setShowsLoading(false);

            }
            catch (err) {
                console.log(err);
            }
        };
        fetchData();

    }, [date]);

    return {
        shows: shows,
        showsLoading: showsLoading,
        showsByScreen : showsByScreen,
        todayDate : todayDate
    };
}

export default useShow;