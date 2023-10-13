import Show from "./Show";
import useMovie from "./hooks/useMovie";
import useShow from "./hooks/useShow";
import { useParams  , BrowserRouter as Router} from "react-router-dom";
import moment from "moment";
import {render , screen} from "@testing-library/react"
jest.mock("./hooks/useMovie" ,  () => ({
    __esModule: true,
    default: jest.fn()
}));

jest.mock("./hooks/useShow" ,  () => ({
    __esModule: true,
    default: jest.fn()
}));

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'), 
    useParams: jest.fn(), 
  }));
describe("Basic Functionality of show component" , () => {
    
    const movieData = {
        "id": "tt6644200",
        "name": "A Quiet Place",
        "duration": 90,
        "genre": "Horror",
        "rating": 7.5,
        "poster": "https://m.media-amazon.com/images/M/MV5BMjI0MDMzNTQ0M15BMl5BanBnXkFtZTgwMTM5NzM3NDM@._V1_.jpg"
    }

    const showData = {"PlayHouse" :[ {
        "id": 9,
        "date": "2023-10-01",
        "slot": {
            "id": 41,
            "name": "slot1",
            "startTime": "9:00 am",
            "endTime": "12:30 pm"
        },
        "screen": {
            "id": 35,
            "name": "PlayHouse"
        },
        "cost": 181.58,
        "movie": {
            "id": "tt6644200",
            "name": "A Quiet Place",
            "duration": 90,
            "genre": "Horror",
            "rating": 7.5,
            "poster": "https://m.media-amazon.com/images/M/MV5BMjI0MDMzNTQ0M15BMl5BanBnXkFtZTgwMTM5NzM3NDM@._V1_.jpg"
        }
    }]};

    const showDate = moment("2023-10-11", "YYYY-MM-DD");
    beforeEach(() => {
        useMovie.mockReturnValue({
            movie : movieData
        });
        useShow.mockReturnValue({
            showsByScreen : showData,
            showsLoading : false
        });
        useParams.mockReturnValue({
            movieId : movieData.id,
            date : showDate
        })
    })
  
    it("should render the movie details" , () => {
        render(<Router><Show/></Router>);
        screen.logTestingPlaygroundURL();

        const img = screen.getByRole('img', { name: /poster/i });
        const heading = screen.getByRole('heading' , {name : /a quiet place/i})
        const genre = screen.getByText(/genre : horror/i);
        const rating = screen.getByText(/rating : 7\.5 \/ 10/i);
        const duration = screen.getByText(/duration : 90 min/i);

        expect(img).toBeInTheDocument();
        expect(heading).toBeInTheDocument();
        expect(genre).toBeInTheDocument();
        expect(rating).toBeInTheDocument();
        expect(duration).toBeInTheDocument();
               
    });

    it("Should render the show details" , () => {
        render(<Router><Show/></Router>);

        const heading = screen.getByRole('heading' , {name : /Show list/i});
        const screenName = screen.getByText(/playhouse/i);
        const startTime = screen.getByText(/cost: 181\.58/i)

        expect(heading).toBeInTheDocument();
        expect(screenName).toBeInTheDocument();
        expect(startTime).toBeInTheDocument();

    })

})