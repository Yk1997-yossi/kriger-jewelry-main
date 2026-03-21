import { Link } from "react-router-dom";
import { homeData } from "./homeData";
import { useMemo, useState } from "react";
import './Home.css';

export default function Home() {
    const [activeVideo, setActiveVideo] = useState(null);

    const favorites = useMemo(() => ([
        {
            name: "לומינה אובלית",
            videoSrc: "/videos/ring1.mp4",
            whatsappText: "שלום, אשמח לפרטים על הטבעת \"לומינה אובלית\"."
        },
        {
            name: "כתר אור",
            videoSrc: "/videos/necklace1.mp4",
            whatsappText: "שלום, אשמח לפרטים על השרשרת \"כתר אור\"."
        },
        {
            name: "הנבל הכסוף",
            videoSrc: "/videos/bracelet1.mp4",
            whatsappText: "שלום, אשמח לפרטים על הצמיד \"הנבל הכסוף\"."
        },
        {
            name: "ניצןץ מוזהב",
            videoSrc: "/videos/earring1.mp4",
            whatsappText: "שלום, אשמח לפרטים על עגילי \"ניצוץ מוזהב\"."
        }
    ]), []);

    const buildWhatsappLink = (text) => {
        const base = homeData.whatsappLink || "";
        const hasQuery = base.includes("?");
        const sep = hasQuery ? "&" : "?";
        return `${base}${sep}text=${encodeURIComponent(text)}`;
    };

    return (
        <div dir="rtl">
            <section className="hero">
                <video
                    className="heroVideo"
                    src={homeData.videoSrc}
                    autoPlay
                    muted
                    loop
                    playsInline
                />

                <div className="heroOverlay">
                    <h1>
                        {homeData.titleMain}
                    </h1>
                    <p className="goldText">{homeData.subtitle}</p>

                    <div className="heroActions">
                        <Link to={homeData.galleryPath} className="btnPrimary">לגלריה</Link>
                        <a
                            href={homeData.whatsappLink}
                            target="_blank"
                            rel="noreferrer"
                            className="btnGhost"
                        >
                            ליעוץ בוואצפ
                        </a>
                    </div>
                </div>
            </section>
            <section className="section">
                <div className="container">
                    <div className="sectionHeader">
                        <h2>למה לבחור בנו</h2>
                        <p>איכות, אמינות ושירות אישי — מהבחירה ועד התכשיט המושלם.</p>
                    </div>

                    <div className="cardsGrid">
                        <div className="infoCard">
                            <h3>המחיר</h3>
                            <p>מחירים האטראקטיבים ביותר שתמצאו,תוך מתן דגש על איכות מושלמת .</p>
                        </div>

                        <div className="infoCard">
                            <h3>התאמה אישית</h3>
                            <p>טבעת אירוסין, שרשרת או צמיד — לפי הטעם והתקציב.</p>
                        </div>

                        <div className="infoCard">
                            <h3>שירות אנושי</h3>
                            <p>ליווי אישי, שקוף ומקצועי — לכל אורך התהליך.</p>
                        </div>

                        <div className="infoCard">
                            <h3>נסיון</h3>
                            <p>ליווי אישי מחבר בורסה, בעל נסיון של 35 שנים בתחום היהלומים</p>
                        </div>

                        {/* NEW: VARIETY */}
                        <div className="infoCard">
                            <h3>גיוון</h3>
                            <p>מבחר יהלומים טבעיים וגם יהלומי מעבדה — באיכות לא מתפשרת ובמחירים משתלמים.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section sectionAlt">
                <div className="container">
                    <div className="sectionHeader">
                        <h2>המוצרים שהלקוחות הכי אוהבים</h2>
                        <p>שלושה דגמים נבחרים — לצפייה מהירה ומעבר קל לוואטסאפ.</p>
                    </div>

                    <div className="favoritesGrid">
                        {favorites.map((item) => (
                            <div className="favoriteCard" key={item.name}>
                                {/* title ABOVE video */}
                                <div className="favoriteTop">
                                    <h3 className="favoriteTitleTop">{item.name}</h3>
                                </div>

                                <button
                                    type="button"
                                    className="favoriteVideoBtn"
                                    onClick={() => setActiveVideo(item)}
                                    aria-label={`הגדלת וידאו: ${item.name}`}
                                >
                                    <video
                                        className="favoriteVideo"
                                        src={item.videoSrc}
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                    />
                                    <span className="favoriteZoomHint">לחץ להגדלה</span>
                                </button>

                                <div className="favoriteBody">
                                    <a
                                        className="btnSmallGold"
                                        href={buildWhatsappLink(item.whatsappText)}
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        לפרטים בוואטסאפ
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* VIDEO MODAL */}
            {activeVideo && (
                <div className="homeLightbox" onClick={() => setActiveVideo(null)}>
                    <div className="homeLightboxInner" onClick={(e) => e.stopPropagation()}>
                        <button
                            type="button"
                            className="homeLightboxClose"
                            onClick={(e) => {
                                e.stopPropagation();
                                setActiveVideo(null);
                            }}
                        >
                            ✕
                        </button>

                        <video
                            className="homeLightboxVideo"
                            src={activeVideo.videoSrc}
                            controls
                            autoPlay
                            playsInline
                        />

                        <div className="homeLightboxActions">
                            <a
                                className="btnPrimary"
                                href={buildWhatsappLink(activeVideo.whatsappText)}
                                target="_blank"
                                rel="noreferrer"
                            >
                                לפרטים בוואטסאפ
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
