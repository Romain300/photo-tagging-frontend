import styles from "../styles/Picture.module.css";
import { useState, useRef } from "react";

function Picture() {
    const [clicks, setClicks] = useState([]);
    const divRef = useRef();
    console.log(clicks)

    const onclick = (e) => {
        const rect = divRef.current.getBoundingClientRect();
        setClicks((prev) => ([
            ... prev, {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            }]))
    }

    return (
        <div ref={divRef} className={styles.mainContainer} onClick={onclick}>
            {clicks.map((click, index) => (
                <div
                    key={index} 
                    className={styles.click} 
                    style={{
                        left: click.x, 
                        top: click.y  
                    }} 
                >
                </div>
            ))}
        </div>

    )
};

export default Picture;