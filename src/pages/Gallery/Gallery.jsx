import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Gallery.css";

export default function Gallery() {
    const [activeItem, setActiveItem] = useState(null);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get("https://kriger-api.onrender.com/gallery")
            .then((response) => {
                setProducts(response.data);
            })
            .catch((error) => {
                console.error("Error fetching products:", error);
            });
    }, []);

    const rings = products.filter((p) => p.category === "RINGS");
    const necklaces = products.filter((p) => p.category === "NECKLACES");
    const bracelets = products.filter((p) => p.category === "BRACELETS");
    const earrings = products.filter((p) => p.category === "EARRINGS");

    const closeLightbox = () => {
        setActiveItem(null);
    };

    useEffect(() => {
        const onKeyDown = (e) => {
            if (e.key === "Escape") closeLightbox();
        };
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, []);

    const renderSection = (title, items) => {
        if (items.length === 0) return null;

        return (
            <section className="gallerySection">
                <div className="sectionTitle">
                    <h2>{title}</h2>
                </div>
                <div className="galleryGrid">
                    {items.map((item) => {
                        const videoObj = item.mediaList?.find(m => m.video);
                        const videoUrl = videoObj ? videoObj.url : "";

                        return (
                            <figure
                                className="mediaCard"
                                key={item.id}
                                onClick={() => setActiveItem(item)}
                                style={{ position: "relative", paddingBottom: "15px" }}
                            >
                                <video
                                    className="galleryMedia"
                                    src={videoUrl}
                                    muted
                                    playsInline
                                    autoPlay
                                    loop
                                    preload="metadata"
                                />
                                <div style={{ textAlign: "center", color: "var(--gold)", fontWeight: "bold", marginTop: "12px", fontSize: "16px", padding: "0 10px" }}>
                                    {item.title}
                                </div>
                            </figure>
                        );
                    })}
                </div>
            </section>
        );
    };

    return (
        <div dir="rtl" className="galleryPage">
            <Helmet>
                <title>קולקציית טבעות אירוסין ותכשיטי יהלומים | קריגר תכשיטים</title>
                <meta name="description" content="צפו בגלריית התכשיטים שלנו. טבעות אירוסין, נישואין ויהלומים בעיצוב אישי ובאיכות הגבוהה ביותר." />
            </Helmet>

            <div className="galleryContainer">
                <header className="galleryHeader">
                    <h1 className="luxuryTitle">טעימה מהקולקציה שלנו</h1>
                    <p className="luxurySubtitle">בחרו פריט לצפייה ולהתייעצות אישית</p>
                </header>

                {renderSection("טבעות", rings)}
                {renderSection("שרשראות", necklaces)}
                {renderSection("צמידים", bracelets)}
                {renderSection("עגילים", earrings)}
            </div>

            {activeItem && (
                <div className="lightboxOverlay" onClick={closeLightbox}>
                    <div
                        className="lightboxInner"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            type="button"
                            className="lightboxClose"
                            onClick={closeLightbox}
                            aria-label="סגור"
                        >
                            ✕
                        </button>
                        <video
                            className="lightboxMedia"
                            src={activeItem.mediaList?.find(m => m.video)?.url}
                            controls
                            autoPlay
                            playsInline
                        />

                        <h3 style={{ color: "white", marginBottom: "5px", fontSize: "24px" }}>{activeItem.title}</h3>

                        <Link
                            to={`/product/${activeItem.id}`}
                            className="whatsappBtn"
                            onClick={closeLightbox}
                            style={{ display: "inline-block", marginTop: "15px", textDecoration: "none" }}
                        >
                            לעמוד המוצר
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}