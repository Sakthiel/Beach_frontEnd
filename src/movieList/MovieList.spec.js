import { render, screen ,act} from '@testing-library/react';
import MovieList from './MovieList';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { BrowserRouter } from 'react-router-dom';

const movieList =  [{
    id: "tt12345",
    name: "hereditary",
    duration: 40,
    genre: "horror",
    rating: 9.1,
    poster: "https://imdb/image.com"
}];
const handlers = [
    rest.get('http://localhost:8080/movies', (req, res, ctx) => {
        return res(
            ctx.json(
                [{
                    id: "tt12345",
                    name: "hereditary",
                    duration: 40,
                    genre: "horror",
                    rating: 9.1,
                    poster: "https://imdb/image.com"
                }]
            )
        )
    })
];
const server = setupServer(...handlers);
describe("Basic rendering of the MovieList Page", () => {
    
    it("should render the header", () => {
        server.listen();
        render(<MovieList />);
        const header = screen.getByRole('heading');
        expect(header).toHaveTextContent("MovieList Page");
        server.resetHandlers();
    });


    it("should render the poster and movie details " , async () => {
            server.listen();
            render(<BrowserRouter><MovieList/></BrowserRouter>);

            const poster = await screen.findAllByRole('img');
            const movieName = screen.getByText('hereditary');
            const genre = screen.getByText(/horror/i);
            const rating = screen.getByText(/rating : 9\.1 \/ 10/i);
            screen.logTestingPlaygroundURL();

            expect(poster[0]).toHaveAttribute('src' , "https://imdb/image.com");
            expect(movieName).toBeInTheDocument();
            expect(genre).toBeInTheDocument();
            expect(rating).toBeInTheDocument();
            server.resetHandlers();
            
            
    });

    it("renders the link to shows page" , async () => {
        server.listen();
        render(<BrowserRouter><MovieList/></BrowserRouter>);
        const link = await screen.findByRole('link');

        expect(link).toHaveAttribute('href' , `/show/${movieList[0].id}/2023-10-02`)

    })
})