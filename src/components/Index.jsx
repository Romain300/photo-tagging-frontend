import styles from "../styles/Index.module.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Index() {
    const [pictures, setPictures] = useState(null);


    useEffect(() => {
        const getPictures = async() => {
            try {
                const response = await fetch('https://photo-tagging-backend-production.up.railway.app/pictures', {
                    mode: "cors",
                    headers: { "Content-type": "applpication/json" }
                })

                if (!response.ok) {
                    return;
                }

                const result = await response.json();
                setPictures(result.images);

                console.log(result.images);
                
                return;

            } catch (err) {
                console.error("Network error", err);

            }
        };

        getPictures();
    }, []);


    



    return (
        <main className={styles.mainContainer}>

            <h1 className={styles.titleApp}>PixTag</h1>
            <div className={styles.presentation}>
                Choose a picture, click on any spot, and see if you can tag them all!
                <br></br>
                Have fun discovering what’s hidden in each photo.
            </div>

            { pictures && (

                <div className={styles.picturesContainer}>
                    {pictures.map((picture, index) => (
                        <div key={index}>
                           <Link to={`/pictures/${picture.id}`}><img src={picture.url} alt={picture.title}/></Link>
                        </div>
                    ))}
                </div>

            )}

        </main>
        
    )
};

export default Index;