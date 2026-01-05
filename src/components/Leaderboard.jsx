import { useEffect, useState, useCallback } from "react";
import styles from "../styles/Leaderboard.module.css";
import { Link } from "react-router-dom";

function Leaderboard({pictureId, resetGame}) {
    const [listPlayers, setListPlayers] = useState(null);

    const sortedPlayers = useCallback((array) => {
        return [...array].sort((a, b) => {
            return parseTime(a.time) - parseTime(b.time);
        })
    }, []);

    const parseTime = (time) => {
        const [minutes, seconds] = time.split(":").map(Number);
        return minutes * 60 + seconds;
    };

    useEffect(() => {
        const getPLayersList = async() => {
            const response = await fetch(`http://localhost:3000/players/${pictureId}`, {
                mode: "cors",
                headers: {"content-type": "application/json"}
            });

            if (!response.ok) return;

            const result = await response.json();
            const sorted = sortedPlayers(result.listPlayers)
            setListPlayers(sorted);
            return;
        };

        getPLayersList();
    }, [pictureId, sortedPlayers])

    return (
        <div className={styles.leaderboardContainer}>
            <div className={styles.leaderboard}>
                <h2 className={styles.title}>Leaderboard</h2>
                {listPlayers && listPlayers.map((player, index) => (
                    <div key={index} className={styles.playerRow}>
                        <span className={styles.rank}>{index + 1}</span>
                        <span className={styles.name}>{player.name}</span>
                        <span className={styles.time}>{player.time}</span>
                    </div>
                ))}
            </div>
            <div className={styles.actions}>
                <Link to={`/pictures/${pictureId}`} onClick={resetGame} className={styles.replayBtn}>Replay</Link>
                <Link to={"/"} className={styles.menuBtn}>Menu</Link>
            </div>
        </div>
    )
}

export default Leaderboard;

