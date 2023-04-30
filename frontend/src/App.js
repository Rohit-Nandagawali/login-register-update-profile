
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import PrivateComponent from "./components/PrivateComponent";

const SERVER_URL = "https://login-register-update-profile-hduy.vercel.app"

function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route element={<PrivateComponent />}>
          <Route path="/" element={<Home SERVER_URL={SERVER_URL} />} />
        </Route>
        <Route path="/register" element={<Register SERVER_URL={SERVER_URL}  />} />
        <Route path="/login" element={<Login SERVER_URL={SERVER_URL}  />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
