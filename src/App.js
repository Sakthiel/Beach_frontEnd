import MovieList from "./movieList/MovieList";
import {createBrowserRouter , RouterProvider ,createRoutesFromElements , Route} from "react-router-dom";
import Show from "./show/Show";
import Layout from "./layout/Layout";
import NotFound from "./NotFound"
import Login from "./login/Login";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path = "/" element = {<Layout/>}>
      <Route index element = {<MovieList />}/>
      <Route path = "/show/:movieId/:date" element = {<Show/>}/>
      <Route path = "/login" element = {<Login/>}/>
      <Route path="*" element = {<NotFound/>}/>
    </Route>
  )
)
function App() {
  return (<>
 <RouterProvider router = {router} />
  </>
  );
}


export default App;
