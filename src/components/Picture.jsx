import styles from "../styles/Picture.module.css";
import { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import Checkbox from "./Input";

function Picture() {
    const { pictureId } = useParams();
    const [click, setClick] = useState(null);
    const [secondes, setSecondes] = useState(0);
    const [minutes, setMinutes] = useState(0);
    // const [form, setForm] = useState([
    //     {name: "Waldo", checked: false},
    //     {name: "Wizard", checked: false},
    //     {name: "Wanda", checked: false},
    //     {name: "Odlaw", checked: false}
    // ]);

    const [form, setForm] = useState(null);

    const [picture, setPicture] = useState(null);

    const pictureRef = useRef();
    const divRef = useRef();
    console.log(click)

    const onclick = (e) => {
        const rect = pictureRef.current.getBoundingClientRect();
        setClick({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        })
    };

    const onChange = (event) => {
        const name = event.target.name;
        setForm((prevForm) => 
            prevForm.map((item) => 
                item.name === name ? { ...item, checked: !item.checked } : { ...item, checked: false }
            
            )
        );
    };

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (pictureRef.current && event.target !== pictureRef.current) {
                setClick(null);
            };
        };
    
        document.addEventListener("click", handleOutsideClick);

        return () => {
            document.removeEventListener("click", handleOutsideClick)
        };
    }, []);

    useEffect(() => {
        const getPicture = async() => {
            const response = await fetch(`http://localhost:3000/pictures/${pictureId}`, {
                mode: "cors",
                headers: { "content-type": "applpication/json"}
            });

            if (!response.ok) {
                return;
            }

            const result = await response.json();
            setPicture(result.image);
            setForm(result.image.characters)
            return;
        }

        getPicture();
    }, [pictureId]);

    useEffect(() => {
        const intervalSeconde = setInterval(() => {
            setSecondes((prev) => (prev + 1));
        }, 1000);

        const intervalMinute = setInterval(() => {
            setMinutes((prev) => (prev + 1));
        }, 60000);



        

        return () => {
            clearInterval(intervalSeconde);
            clearInterval(intervalMinute);
        }
    }, []);
    

  

    return (
        <section>
            { picture && (
                <div className={styles.intro}>
                    <h1>🔍 {picture.title}</h1>
                    <h2>{minutes}:{secondes % 60}</h2>
                    <h3>Find the charactersc below !</h3>
                    <div className={styles.card}>
                        <img className={styles.characteres} src="https://curiousstgeorge.wordpress.com/wp-content/uploads/2012/05/waldo.jpg" alt="Characteres to find" />
                        <div>Odlaw, Wizard Whitebeard, Wenda, and Waldo</div>
                    </div>
                </div>
                
            )}
            { picture && (
                <div className={styles.mainContainer} >
        
                    <img ref={pictureRef} onClick={onclick} src={picture.url} alt="where is waldo picture"/>
                    
                    {click && (
                        <>
                            <div
                                className={styles.click} 
                                style={{
                                    left: click.x, 
                                    top: click.y, 
                                }} 
                                onClick={(e) => e.stopPropagation()}
                            >
                            </div>

                            <div 
                                ref={divRef} 
                                className={styles.divChoices} 
                                style={{ 
                                    left: click.x, 
                                    top: click.y, 
                                }}
                                onClick={(e) => e.stopPropagation()}
                            >
                                <h3>Who's here</h3>
                                <form>
                                    {form.map((character, index) => (
                                        <Checkbox onChange={onChange} key={index} id={index} checked={character.checked} name={character.name} label={character.name}/>
                                    ))}
                                </form>
                            </div>

                        </>
                    )}
        
                </div>
            )}
        </section>
        

    )
};

export default Picture;


