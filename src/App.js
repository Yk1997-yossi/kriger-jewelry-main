import {BrowserRouter, Routes, Route} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import AboutUs from "./pages/AboutUs";
import {Analytics} from "@vercel/analytics/react";

function App() {
    return (
        <BrowserRouter>
            <Navbar/>

            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/gallery" element={<Gallery/>}/>
                <Route path="/contact" element={<Contact/>}/>
                <Route path={"/about"} element={<AboutUs/>}/>
            </Routes>
            <Analytics/>
        </BrowserRouter>
    );
}

export default App;
