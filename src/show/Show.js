import useMovie from './hooks/useMovie';
import { useLocation, useParams , useNavigate} from 'react-router-dom';
import {
    Backdrop,
    Button,
    CircularProgress,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Typography,
    Divider
} from "@material-ui/core";
import useShow from './hooks/useShow';
import showStyles from './styles/showStyles';
import ShowDateNavigation from './ShowDateNavigation';

const Show = () => {
    let location = useLocation();
    const navigate = useNavigate();
    const { movieId, date } = useParams();
    const { movie } = useMovie(movieId);
    const { showsByScreen, showsLoading , todayDate} = useShow(movieId, date);
    const classes = showStyles();

    return (
        <>
            <div className={classes.movieInfoContainer}>
                <div className={classes.card}>
                <img src={movie.poster} alt = "poster" style={{width : '100%' , height: '100%'}}></img>
                </div>
                <div className={classes.movieDetails}>
                    <Typography variant='h3' style={{ marginBottom: '16px' }}> {movie.name}</Typography>

                    <div>
                    <Typography > Genre : {movie.genre}</Typography>
                    <Typography >Rating : {movie.rating} / 10</Typography>
                    <Typography >Duration : {movie.duration} min</Typography>
                    </div>
                </div>
            </div>


            <h2>Show List</h2>
            <ShowDateNavigation movieId={movieId} selectedDate={date} navigate = {navigate} />
            {showsLoading ? (<Typography>Shows Loading ...</Typography>) :
             ( <List className={classes.showList}>
                
                {Object.keys(showsByScreen).map((screenName) => (
                  <div key= {screenName}>
                    <Divider />
                    <div key={screenName} className={classes.screenShows}>
                        
                        <div className={classes.screenName}><ListItemText primary={screenName}></ListItemText></div>
                        <ul className={classes.showTimings}>
                            {showsByScreen[screenName].map((show) => (
                                <li key={show.id} className={classes.showItem}>
                                    <ListItemText primary={show.slot.startTime}></ListItemText>
                                    <ListItemText primary={`Cost: ${show.cost}`}></ListItemText>
                                </li>
                            ))}
                        </ul>   
                    </div>
                    <Divider/>
                    </div>
        
                ))}
            </List>)}
           

        </>
    );
}
export default Show;
