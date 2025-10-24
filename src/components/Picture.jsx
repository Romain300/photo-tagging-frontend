import styles from "../styles/Picture.module.css";
import { useState, useRef, useEffect } from "react";
import Checkbox from "./Input";

function Picture() {
    const [click, setClick] = useState(null);
    const [form, setForm] = useState([
        {name: "Waldo", checked: false},
        {name: "Wizard", checked: false},
        {name: "Wanda", checked: false},
        {name: "Odlaw", checked: false}
    ]);

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
            if (event.target !== pictureRef.current) {
                setClick(null);
            };
        };

        document.addEventListener("click", handleOutsideClick);

        return () => {
            document.removeEventListener("click", handleOutsideClick)
        };
    }, []);

    

  

    return (
        <div ref={pictureRef} className={styles.mainContainer} onClick={onclick}>
            
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

    )
};

export default Picture;


