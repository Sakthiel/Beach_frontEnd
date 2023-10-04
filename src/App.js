import MovieList from "./movieList/MovieList";
import {createBrowserRouter , RouterProvider ,createRoutesFromElements , Route} from "react-router-dom";
import Show from "./show/Show";
import Layout from "./layout/Layout";
import NotFound from "./NotFound"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path = "/" element = {<Layout/>}>
      <Route index element = {<MovieList/>}/>
      <Route path = "/show" element = {<Show/>}/>


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
