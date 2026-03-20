import { homeData } from "../data/homeData";

export default function Contact() {
    const phoneDisplay = "054-7494418";
    const phoneTel = "0547494418";
    const bgVideo = process.env.PUBLIC_URL + "/videos/ring1.mp4";

    return (
        <div className="contactPage" dir="rtl">
            {/* Background Video */}
            <video
                className="contactBgVideo"
                src={bgVideo}
                autoPlay
                loop
                muted
                playsInline
            />

            <div className="contactOverlay"></div>

            <div className="contactContainer">
                <h1 className="contactTitle">יצירת קשר</h1>

                <p className="contactSubtitle">
                    לקביעת פגישה / ייעוץ ללא התחייבות — פנו אלינו בוואטסאפ או בטלפון
                </p>

                <div className="contactCard">
                    <div className="contactInfo">
                        <h3>📞 טלפון</h3>
                        <a className="contactPhoneLink" href={`tel:${phoneTel}`}>
                            {phoneDisplay}
                        </a>

                        <h3>💬 וואטסאפ</h3>
                        <a
                            href={homeData.whatsappLink}
                            target="_blank"
                            rel="noreferrer"
                            className="contactWhatsappBtn"
                        >
                            פנו אלינו בוואטסאפ
                        </a>

                        <h3>📍 מיקום</h3>
                        <p>בורסת היהלומים, רמת גן</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
