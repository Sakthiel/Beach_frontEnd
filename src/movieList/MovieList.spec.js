import { render, screen ,act} from '@testing-library/react';
import MovieList from './MovieList';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { BrowserRouter } from 'react-router-dom';
const handlers = [
    rest.get('http://localhost:8080/movies', (req, res, ctx) => {
        return res(
            ctx.json(
                [{
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
        screen.logTestingPlaygroundURL();
        expect(header).toHaveTextContent("MovieList Page");
        server.resetHandlers();
    });
    it("should render the poster and movie details " , async () => {
            server.listen();
            render(<BrowserRouter><MovieList/></BrowserRouter>);
            screen.debug();
            const poster = await screen.findAllByRole('img');
            const movieName = screen.getByText('hereditary');
            const genre = screen.getByText(/horror/i);
            const rating = screen.getByText(/rating : 9\.1 \/ 10/i);
            screen.logTestingPlaygroundURL();
            expect(poster[0]).toHaveAttribute('src' , "https://imdb/image.com")
           
            server.resetHandlers();
            server.close();
            
            
    });
})