import {BrowserRouter, Routes, Route} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Gallery from "./pages/Gallery/Gallery";
import Contact from "./pages/Contact/Contact";
import AboutUs from "./pages/AboutUs/AboutUs";
import {Analytics} from "@vercel/analytics/react";
import AdminPanel from "./management/AdminPanel"
import ProductPage from "./pages/ProdactPage/ProductPage";

function App() {
    return (
        <BrowserRouter>
            <Navbar/>

            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/gallery" element={<Gallery/>}/>
                <Route path="/contact" element={<Contact/>}/>
                <Route path={"/about"} element={<AboutUs/>}/>
                <Route path="/product/:id" element={<ProductPage />} />
                <Route path="/admin-secret-panel" element={<AdminPanel />} />
            </Routes>
            <Analytics/>
        </BrowserRouter>
    );
}

export default App;
