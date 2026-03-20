import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <header className="navbar" dir="rtl">
            <div className="container navbarInner">
                <div className="brand">
                    <span className="brandName">KRIGER JEWELRY</span>
                </div>

                <nav className="navLinks">
                    <Link className="navLink" to="/">בית</Link>
                    <Link className="navLink" to="/gallery">גלריה</Link>
                    <Link className="navLink" to="/contact">יצירת קשר</Link>
                    <Link className="navLink" to="/about">קצת עלינו</Link>
                </nav>
            </div>
        </header>
    );
}
