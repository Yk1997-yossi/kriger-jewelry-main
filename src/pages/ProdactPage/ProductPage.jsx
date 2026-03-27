import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import axios from "axios";
import "./ProductPage.css";

export default function ProductPage() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);

        axios.get(`https://kriger-api.onrender.com/product/${id}`)
            .then((response) => {
                setProduct(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return (
            <div dir="rtl" className="productPage" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <h2 className="luxuryTitle">טוען נתונים...</h2>
            </div>
        );
    }

    if (!product) {
        return (
            <div dir="rtl" className="productPage" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <h2 style={{ color: "white" }}>המוצר לא נמצא</h2>
            </div>
        );
    }

    const videoUrl = product.mediaList?.find(m => m.video)?.url;

    return (
        <div dir="rtl" className="productPage">
            <Helmet>
                <title>{product.seoData?.title || product.title}</title>
                <meta name="description" content={product.seoData?.description || product.description} />
            </Helmet>

            <div className="productContainer">
                <header className="productHeader">
                    <h1 className="luxuryTitle" style={{ fontSize: "36px", marginBottom: "20px" }}>{product.title}</h1>
                </header>

                {videoUrl && (
                    <div className="productVideoContainer" style={{ textAlign: "center", marginBottom: "30px" }}>
                        <video
                            className="productMedia"
                            src={videoUrl}
                            controls
                            autoPlay
                            playsInline
                            loop
                            style={{ width: "100%", maxHeight: "40vh", objectFit: "contain", borderRadius: "18px", boxShadow: "0 10px 30px rgba(0,0,0,0.5)" }}
                        />
                    </div>
                )}

                <div className="productDetailsCard" style={{ background: "rgba(255, 255, 255, 0.03)", border: "1px solid rgba(215, 179, 90, 0.25)", borderRadius: "18px", padding: "30px", marginBottom: "40px", lineHeight: "1.8" }}>
                    <h2 className="detailsTitle" style={{ color: "var(--gold)", marginBottom: "20px", fontSize: "22px" }}>מפרט התכשיט</h2>

                    <p style={{ marginBottom: "10px" }}><strong>מחיר:</strong> ₪{product.price?.toLocaleString()}</p>
                    <p style={{ marginBottom: "10px" }}><strong>תיאור:</strong> {product.description}</p>
                    <p style={{ marginBottom: "10px" }}><strong>צבע וסוג מתכת:</strong> {product.color}</p>

                    {product.diamondSpecs && (
                        <div className="diamondSpecsSection" style={{ marginTop: "20px", paddingTop: "20px", borderTop: "1px solid rgba(215, 179, 90, 0.2)" }}>
                            <h3 className="diamondSpecsTitle" style={{ color: "var(--gold)", marginBottom: "15px", fontSize: "18px" }}>פרטי יהלומים (מעבדה)</h3>
                            <p style={{ marginBottom: "10px" }}><strong>משקל כולל:</strong> {product.diamondSpecs.weight}</p>
                            <p style={{ marginBottom: "10px" }}><strong>רמת ניקיון:</strong> {product.diamondSpecs.clarity}</p>
                            <p style={{ marginBottom: "10px" }}><strong>צבע:</strong> {product.diamondSpecs.color}</p>
                            <p style={{ marginBottom: "10px" }}><strong>פירוט נוסף:</strong> {product.diamondSpecs.stoneDetail}</p>
                        </div>
                    )}
                </div>

                <div className="actionContainer" style={{ textAlign: "center", paddingBottom: "40px" }}>
                    <a
                        href={`https://wa.me/972547494418?text=${encodeURIComponent(`שלום, אני מעוניין בפרטים לגבי: ${product.title} (מקט: ${product.id})`)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="whatsappBtn"
                        style={{ display: "inline-block", background: "var(--gold)", color: "white", padding: "15px 40px", borderRadius: "30px", textDecoration: "none", fontWeight: "bold", fontSize: "18px" }}
                    >
                        לרכישה ופרטים בוואטסאפ
                    </a>
                </div>
            </div>
        </div>
    );
}