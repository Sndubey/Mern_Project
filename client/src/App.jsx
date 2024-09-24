import {BrowserRouter, Routes, Route} from "react-router-dom";
import {Home} from "./pages/Home";  // here we are importing Home component as object bcz its been exported directly not by default keyword.
import {About} from "./pages/About";
import {Contact} from "./pages/Contact";
import {Service} from "./pages/Service";
import {Register} from "./pages/Register";
import {Login} from "./pages/Login";
import {Navbar} from "./components/Navbar";
import {Footer} from "./components/Footer";
import {Error} from "./pages/Error";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />  {/* we have used Navbar component here bcz we want navbar to visible on every page. */}
        <Routes>
          <Route path="/" element={<Home />} />  {/* its like taking req from url bar (like "/" url) and sending res as <Home/> */}
          <Route path="/about" element={<About />} />  {/* the path /about is taken from url bar */}
          <Route path="/contact" element={<Contact />} />
          <Route path="/service" element={<Service />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Error />} />  {/* if we put some wrong url in url bar then Error page will be displayed */}
        </Routes>
        <Footer/>
      </BrowserRouter>
    </>
  )
};

export default App;
