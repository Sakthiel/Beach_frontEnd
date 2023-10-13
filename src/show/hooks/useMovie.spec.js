import { renderHook } from "@testing-library/react-hooks";
import { when } from "jest-when";
import axios from "axios";
import { authHeader } from "../../helper/authService";
import { waitFor } from "@testing-library/react"
import useMovie from "./useMovie"
jest.mock("axios", () => ({
    get: jest.fn(),
}));

jest.mock("../../helper/authService", () => ({
    authHeader: jest.fn()
}))

describe("Basic Functionality" , () => {
    let movieId;
    const testConfig = {
        headers: {
            Authorization: 'Basic testUsername:testPassword'
        }
    };

    const movieData = {data : {
        "id": "tt6644200",
        "name": "A Quiet Place",
        "duration": 90,
        "genre": "Horror",
        "rating": 7.5,
        "poster": "https://m.media-amazon.com/images/M/MV5BMjI0MDMzNTQ0M15BMl5BanBnXkFtZTgwMTM5NzM3NDM@._V1_.jpg"
    }}
    beforeEach(() => {
        movieId = "tt6644200"
        authHeader.mockReturnValue(testConfig);
        when(axios.get)
            .calledWith(`http://localhost:8080/movies/${movieId}`, testConfig)
            .mockResolvedValue(movieData);
    });

    it("Should initialize the hook with empty object and loading", () => {
        const { result } = renderHook(() => useMovie(movieId));

        const { movie , movieLoading} = result.current;

        expect(movie).toEqual({});
        expect(movieLoading).toBe(true);
    });
    it("Should get movie and finish loading after rendering", async () => {
        const { result, waitForNextUpdate } = renderHook(() => useMovie(movieId));

        await waitForNextUpdate();
        const { movie , movieLoading} = result.current;

        expect(movie).toEqual(movieData.data);
        expect(movieLoading).toBe(false);

    });



})