import { useState } from "react";

function useHint() {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const getHint = async(pictureTitle, character) => {
        if (!pictureTitle || !character) {
            setError("Please select a character.")
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await fetch("https://photo-tagging-backend-production.up.railway.app/hints", {
                method: "POST",
                mode: "cors",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({
                    pictureTitle,
                    character
                    
                })
            });

            if (!response.ok) {
                throw new Error("Oops, no hint available sorry.");
            }

            const result = await response.json();
            return result.hint;

        } catch(err) {
            setError(err.message);
            return null;
        } finally {
            setLoading(false);
        }

    };
    
    return { getHint, loading, error, setError};
}

export default useHint;

