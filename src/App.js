import {AlbumsContextProvider} from "./Contexts/albumsContext";
import Home from "./Components/home/Home";
import { ToastContainer, Slide } from "react-toastify";
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-toastify/dist/ReactToastify.min.css";
import './App.css';

function App() {
  return (
      <div className="App h-100">
           <ToastContainer position="top-center" transition={Slide} theme="colored" pauseOnFocusLoss={false}/>
            <AlbumsContextProvider>
               <Home/>
            </AlbumsContextProvider>
      </div>
  );
}

export default App;
