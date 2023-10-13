import { renderHook } from "@testing-library/react-hooks";
import useShow from "./useShow";
import moment from "moment";
import { when } from "jest-when";
import axios from "axios";
import { authHeader } from "../../helper/authService";
import { waitFor } from "@testing-library/react"
jest.mock("axios", () => ({
    get: jest.fn(),
}));

jest.mock("../../helper/authService", () => ({
    authHeader: jest.fn()
}))


describe("Basic functionality", () => {
    let showDate;
    let movieId;
    const testConfig = {
        headers: {
            Authorization: 'Basic testUsername:testPassword'
        }
    };
    const showsData = [
      
        {
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
        }
    ]
    beforeEach(() => {
        showDate = moment("2023-10-11", "YYYY-MM-DD");
        movieId = "ttbd2123"
        authHeader.mockReturnValue(testConfig);
        when(axios.get)
            .calledWith(`http://localhost:8080/${movieId}/${showDate}`, testConfig)
            .mockResolvedValue(showsData);
    });
    it("Should initialize the hook with empty shows and loading", () => {
        const { result } = renderHook(() => useShow(movieId, showDate));

        const { shows, showsLoading } = result.current;

        expect(shows).toEqual([]);
        expect(showsLoading).toBe(true);
    });

    it("Should get shows and finish loading after rendering", async () => {
        const { result, waitForNextUpdate } = renderHook(() => useShow(movieId, showDate));

        await waitForNextUpdate();
        const { shows, showsLoading } = result.current;

        expect(shows).toEqual(showsData);
        expect(showsLoading).toBe(false);

    });

    
})