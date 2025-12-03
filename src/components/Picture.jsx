import styles from "../styles/Picture.module.css";
import { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import Checkbox from "./Input";
import { Input } from "./Input";

function Picture() {
    const { pictureId } = useParams();
    const [click, setClick] = useState(null);
    const [secondes, setSecondes] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [form, setForm] = useState(null);
    const [picture, setPicture] = useState(null);
    const pictureRef = useRef();
    const divRef = useRef();
    const [message, setMessage] = useState(null);
    const [markers, setMarkers] = useState([]);
    const dialogRef = useRef();
    const [gameFinished, setGameFinished] = useState(false);

    const onclick = (e) => {
        const rect = pictureRef.current.getBoundingClientRect();
        setClick({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
            xPer: (e.clientX - rect.left) / rect.width,
            yPer: (e.clientY - rect.top) / rect.height
        })
        setMessage(null);
    };

    const onChange = (event) => {
        const name = event.target.name;
        setForm((prevForm) => 
            prevForm.map((item) => 
                item.name === name ? { ...item, checked: !item.checked } : { ...item, checked: false }
            
            )
        );
    };

    const onSubmit = (event) => {
        event.preventDefault();
        
        const found = form.find(character => 
            character.checked 
            && click.xPer > character.xMin && click.xPer < character.xMax
            && click.yPer > character.yMin && click.yPer < character.yMax
        );

        if (found) {
            setMessage(null);
            const updatedForm = form.filter(char => char.name !== found.name)
            setForm(updatedForm);
            setClick(null);
            setMarkers((prev) => (
                [...prev, {x: click.x, y: click.y}]
            ));

            if (updatedForm.length <= 0) {
                setGameFinished(true);
                dialogRef.current.showModal();
            }
        } else {
            setMessage("Oops, wrong guess!");
        }
    };

    const closeDialog = () => {
        dialogRef.current.close();
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
                headers: { "content-type": "application/json"}
            });

            if (!response.ok) {
                return;
            }

            const result = await response.json();
            setPicture(result.image);
            setForm(result.image.characters);
            console.log(result.image.characters)
            return;
        }

        getPicture();
    }, [pictureId]);

    useEffect(() => {
        if (gameFinished) return;

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
    }, [gameFinished]);
    

  

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
                                    left: `${click.x}px`,
                                    top: `${click.y}px`
                                }} 
                            >
                            </div>

                            <div 
                                ref={divRef} 
                                className={styles.divChoices} 
                                style={{ 
                                    left: `${click.x}px`,
                                    top: `${click.y}px`
                                }}
                                onClick={(e) => e.stopPropagation()}
                            >
                                <h3>Who's here</h3>
                                { message && (
                                    <p>{message}</p>
                                )}
                                <form onSubmit={onSubmit}>
                                    {form.map((character, index) => (
                                        <Checkbox onChange={onChange} key={index} id={index} checked={character.checked} name={character.name} label={character.name}/>
                                    ))}
                                    <button type="submit">Submit</button>
                                </form>
                            </div>

                        </>
                    )}

                    {markers.map((marker, index) => (
                        <div
                            key={index}
                            className={styles.foundMarker}
                            style={{
                                left: `${marker.x}px`,
                                top: `${marker.y}px`
                            }}
                        >
                            ✔
                        </div>
                    ))}
        
                </div>
            )}

            <dialog ref={dialogRef}>
                <h3>Congratulation! you finished it in:</h3>
                <h2>{minutes}:{secondes % 60}</h2>
                <form>
                    <div>
                        <Input id='name' label='Enter Your Name:'  type='text' />
                    </div>
                    <button type="button" onClick={closeDialog}>Close</button>
                </form>
            </dialog>

        </section>
        

    )
};

export default Picture;

//add end of game + promp name player 
//Stop playing after dialog closed and check Z markers
//Finish form
//add players to database


