import Displayuser from "./pages/Displayuser"
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer} from 'react-toastify';
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Register from "./pages/Register";
import UpdateUser from "./pages/UpdateUser";

function App() {


  return (
    <>
  
   <BrowserRouter>
   <Routes>
    <Route path="/" element={<Displayuser/>}/>
    <Route path="/register" element={<Register/>}/>
    <Route path="/update/:userid" element={<UpdateUser/>}/>
   </Routes>
   <ToastContainer/>
   </BrowserRouter>
    
  
    </>
  )
}

export default App
