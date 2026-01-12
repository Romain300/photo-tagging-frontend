import { useState } from 'react';
import styles from '../styles/Form.module.css';
import { Input } from "./Input";

function PLayerForm({ closeDialog, data, onChange, value, addPlayer }) {

    const [errors, setErrors] = useState(null);

    const onSubmit = async(event) => {
        event.preventDefault();

        try {
            console.log(data)
            const response = await fetch("https://photo-tagging-backend-production.up.railway.app/players", {
                mode: "cors",
                method: "POST",
                headers: { "content-type": "application/json"},
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                const result = await response.json();
                setErrors(result.errors);
                return;
            }

            addPlayer();
            return;

        }catch (err) {
            console.error("Network error", err);
        }

    };


    return (
        <form onSubmit={onSubmit}>
            {errors && (
                <ul>
                    {errors.map((error, index) => 
                        <li key={index}>{error.msg}</li>
                    )}
                </ul>
            )}
            <div>
                <Input id='name' name="name" label='Enter Your Name:'  type='text' onChange={onChange} value={value}/>
            </div>
            <div className={styles.divButton}>
                <button type="button" onClick={closeDialog}>Close</button>
                <button type="submit">Submit</button>
            </div>
        </form>
    )
}

export default PLayerForm;
