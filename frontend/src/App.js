
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import PrivateComponent from "./components/PrivateComponent";

function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route element={<PrivateComponent />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
