import { useEffect, useMemo, useState } from "react";
import { galleryData } from "./GalleryData";
import "./Gallery.css";

export default function Gallery() {
    const [activeItem, setActiveItem] = useState(null);

    const phoneNumber = "972547494418";

    const videoItems = useMemo(
        () => galleryData.filter((x) => x.type === "video"),
        []
    );

    const getFileName = (src) => {
        const parts = String(src).split("/");
        return parts[parts.length - 1] || src;
    };

    const rings = videoItems.filter(
        (v) =>
            getFileName(v.src).toLowerCase().includes("ring")&&
            !getFileName(v.src).toLowerCase().includes("earring")
    );

    const necklaces = videoItems.filter((v) =>
        getFileName(v.src).toLowerCase().includes("necklace")
    );

    const bracelets = videoItems.filter((v) =>
        getFileName(v.src).toLowerCase().includes("bracelet")
    );
    const earrings = videoItems.filter((v) =>
        getFileName(v.src).toLowerCase().includes("earring")
    );

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

    const renderSection = (title, items) => (
        <section className="gallerySection">
            <div className="sectionTitle">
                <h2>{title}</h2>
            </div>

            <div className="galleryGrid">
                {items.map((item, index) => (
                    <figure
                        className="mediaCard"
                        key={`${title}-${index}`}
                        onClick={() => setActiveItem(item)}
                    >
                        <video
                            className="galleryMedia"
                            src={item.src}
                            muted
                            playsInline
                            autoPlay
                            loop
                            preload="metadata"
                        />
                    </figure>
                ))}
            </div>
        </section>
    );

    const activeName = activeItem ? getFileName(activeItem.src) : "";

    return (
        <div dir="rtl" className="galleryPage">
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
                            src={activeItem.src}
                            controls
                            autoPlay
                            playsInline
                        />

                        <a
                            href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(
                                `שלום, אני מעוניין בפריט: ${activeName}`
                            )}`}
                            target="_blank"
                            rel="noreferrer"
                            className="whatsappBtn"
                        >
                            לפרטים לגבי מוצר זה
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
}
