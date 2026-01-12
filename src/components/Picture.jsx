import styles from "../styles/Picture.module.css";
import { useState, useRef, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import Checkbox from "./Input";
import PLayerForm from "./PlayerForm";
import Leaderboard from "./Leaderboard";

function Picture() {
    const location = useLocation();
    const navigate = useNavigate();
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
    const [playerData, setPlayerData] = useState({
        pictureId,
        name: null,
        time: null
    });
    const [playerAdded, setPlayerAdded] = useState(false);

    const resetGame = () => {
        setClick(null);
        setSecondes(0);
        setMinutes(0);
        setForm(picture?.characters || []); 
        setMarkers([]);
        setGameFinished(false);
        setPlayerData({ pictureId, name: null, time: null });
        setPlayerAdded(false);
        setMessage(null);
    };

    const onclick = (e) => {
        const rect = pictureRef.current.getBoundingClientRect();
        setClick({
            xPer: (e.clientX - rect.left) / rect.width,
            yPer: (e.clientY - rect.top) / rect.height
        })
        setMessage(null);
    };

    const onChange = (event) => {
        const name = event.target.value;
        setForm((prevForm) => 
            prevForm.map((item) => 
                item.name === name ? { ...item, checked: !item.checked } : { ...item, checked: false }
            
            )
        );
    };

    const playerName = (event) => {
        const { id, value } = event.target;
        setPlayerData({
            ...playerData,
            [id]: value
        });
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
                [...prev, {xPer: click.xPer, yPer: click.yPer}]
            ));

            if (updatedForm.length <= 0) {
                setGameFinished(true);
                setPlayerData({
                    ...playerData,
                    ["time"]: `${minutes}:${secondes % 60}`
                });
                dialogRef.current.showModal();
            }
        } else {
            setMessage("Oops, wrong guess!");
        }
    };

    const addPlayer = () => {
        setPlayerAdded(true);
    }

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
                navigate("/404NotFound");
                return;
            }

            const result = await response.json();
            setPicture(result.image);
            const characters = result.image.characters.map((character) => (
                {...character, checked: false}
            ))
            setForm(characters);
            return;
        }

        getPicture();
    }, [pictureId, navigate]);

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
        <section key={location.key}>
            { picture && (
                <div className={styles.intro}>
                    <h1>🔍 {picture.title}</h1>
                    <h2>{minutes}:{secondes % 60}</h2>
                    <h3>Find the charactersc below !</h3>
                    <div className={styles.card}>
                        <img className={styles.characteres} src="https://curiousstgeorge.wordpress.com/wp-content/uploads/2012/05/waldo.jpg" alt="Characteres to find" />
                        <div className={styles.namesChar}>Odlaw, Wizard Whitebeard, Wenda, and Waldo</div>
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
                                    left: `${click.xPer * 100}%`,
                                    top: `${click.yPer * 100}%`
                                }} 
                            >
                            </div>

                            <div 
                                ref={divRef} 
                                className={styles.divChoices} 
                                style={{ 
                                    left: `${click.xPer * 100}%`,
                                    top: `${click.yPer * 100}%`
                                }}
                                onClick={(e) => e.stopPropagation()}
                            >
                                <h3>Who's here</h3>
                                { message && (
                                    <p>{message}</p>
                                )}
                                <form onSubmit={onSubmit}>
                                    {form.map((character, index) => (
                                        <Checkbox onChange={onChange} key={index} id={index} checked={character.checked} name={character.name} label={character.name} value={character.name}/>
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
                                left: `${marker.xPer * 100}%`,
                                top: `${marker.yPer * 100}%`
                            }}
                        >
                            ✔
                        </div>
                    ))}
        
                </div>
            )}

            <dialog ref={dialogRef}>
                { !playerAdded && (
                    <>
                        <h3>Congratulation! you finished it in:</h3>
                        <h2>{minutes}:{secondes % 60}</h2>
                        <PLayerForm data={playerData} closeDialog={closeDialog} onChange={playerName} value={playerData.name} addPlayer={addPlayer}/>
                    </>
                )}

                { playerAdded && (
                
                    <Leaderboard pictureId={pictureId} resetGame={resetGame}/>
                
                )}
                
            </dialog>

        </section>
        

    )
};

export default Picture;



