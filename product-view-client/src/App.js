import Homepage from "./components/Homepage/Homepage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserProvider from "./components/UserProvider/UserProvider";
import Login from "./components/Login/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import UserContext from "./components/UserProvider/UserProvider";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Homepage />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
