import { useState} from "react";
import axios from "axios";

function AdminPanel(){
    const[productId,setProductId] = useState("")
    const[productTitle,setProductTitle] = useState("")
    const[productColor,setProductColor] = useState("")
    const[category,setCategory] = useState("")
    const[stonesNumber,setStonesNumber] = useState(0)
    const[isLabStones,setIsLabStones] = useState(true)
    const[productDescription,setProductDescription] = useState("")
    const[price,setPrice] = useState(0)

    const[weight,setWeight] = useState("")
    const[clarity,setClarity] = useState("")
    const[diamondColor,setDiamondColor] = useState("")
    const[stoneDetail,setStoneDetail] = useState("")

    const videoId = ""
    const[isVideo,setIsVideo] = useState(true)
    const[url,setUrl] = useState("")

    const[seoTitle,setSeoTitle] = useState("")
    const[seoDescription,setSeoDescription] = useState("")

    function createNewProduct(){
        const diamond = {
            weight:weight,
            clarity: clarity,
            color: diamondColor,
            stoneDetail:stoneDetail
        }
        const seo = {
            title:seoTitle,
            description: seoDescription
        }
        const media = [
            {
                id:videoId,
                isVideo:isVideo,
                url:url
            }
        ]
        const newProduct = {
            id:productId,
            title:productTitle,
            color:productColor,
            category:category.toUpperCase(),
            stonesNumber: parseInt(stonesNumber) || 0,
            isLabStones:isLabStones,
            description:productDescription,
            diamondSpecs:diamond,
            price: parseFloat(price) || 0,
            mediaList:media,
            seoData:seo
        }
        axios.post("https://kriger-api.onrender.com/add-jewelry",newProduct)
            .then(response => {
                console.log("המוצר נוסף בהצלחה");
            })
            .catch(error => {
                console.error("שגיאה", error);
            });
    }
    return(
        <>
            <h1>הוספת תכשיט חדש לבסיס הנתונים</h1>
            <div>
                <h2> פרטי יהלומים </h2>
                <input placeholder={"משקל יהלום"} value={weight} onChange={(event) =>{
                    setWeight(event.target.value)
                }}/>
                <input placeholder={"רמת ניקיון"}  value={clarity} onChange={(event) =>{
                    setClarity(event.target.value)
                }}/>
                <input  placeholder={"צבע יהלום"}  value={diamondColor} onChange={(event) =>{
                    setDiamondColor(event.target.value)
                }}/>
                <input  placeholder={"טקסט חופשי"} value={stoneDetail} onChange={(event) =>{
                    setStoneDetail(event.target.value)
                }}/>
            </div>
            <div>
                <h2> כותרות עבור גוגל </h2>
                <input  placeholder={"כותרת"} value={seoTitle} onChange={(event) =>{
                    setSeoTitle(event.target.value)
                }}/>
                <input  placeholder={"תוכן"} value={seoDescription} onChange={(event) =>{
                    setSeoDescription(event.target.value)
                }}/>
            </div>
            <div>
                <h2> פרטי מדיה </h2>
                <input  placeholder={"קישור לקובץ"} value={url} onChange={(event) =>{
                    setUrl(event.target.value)
                }}/>
                <input  placeholder={"האם זה וידאו"} value={isVideo} onChange={(event) =>{
                    setIsVideo(event.target.value)
                }}/>
            </div>
            <div>
                <h2> פרטי תכשיט </h2>
                <input  placeholder={"מזהה מוצר"} value={productId} onChange={(event) =>{
                    setProductId(event.target.value)
                }}/>
                <input  placeholder={"כותרת מוצר לגלריה"} value={productTitle} onChange={(event) =>{
                    setProductTitle(event.target.value)
                }}/>
                <input  placeholder={"צבע תכשיט"} value={productColor} onChange={(event) =>{
                    setProductColor(event.target.value)
                }}/>
                <input  placeholder={"קטגורית תכשיט"} value={category} onChange={(event) =>{
                    setCategory(event.target.value)
                }}/>
                <input type="number" placeholder={"מספר אבנים"}  value={stonesNumber} onChange={(event) =>{
                    setStonesNumber(event.target.value)
                }}/>
                <input  placeholder={"האם יהלום מעבדה"} value={isLabStones} onChange={(event) =>{
                    setIsLabStones(event.target.value)
                }}/>
                <input  placeholder={"תיאור מוצר לגלריה"} value={productDescription} onChange={(event) =>{
                    setProductDescription(event.target.value)
                }}/>
                <input  type="number" placeholder={"מחיר התכשיט"} value={price} onChange={(event) =>{
                    setPrice(event.target.value)
                }}/>
            </div>
            <div>
                <button onClick={createNewProduct}>
                    add
                </button>
            </div>
        </>
    )
}
export default AdminPanel