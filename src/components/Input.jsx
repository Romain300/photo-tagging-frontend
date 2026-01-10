import styles from '../styles/Input.module.css';

function Checkbox({ label, checked, name, id, onChange, value }) {
    
    return (
        <div>
            <input 
                id={id} 
                checked={checked}
                type="checkbox" 
                name={name} 
                onChange={onChange} 
                value={value}
            />
            <label htmlFor={id}>
                {label}
            </label>
        </div>

    )
};

export function Input({ label, type, name, id, onChange, value }) {
    
    return (
        <div className={styles.inputCustom}>
            <label htmlFor={id}>
                {label}
            </label>
            <input className={styles.input}
                id={id} 
                type={type} 
                name={name} 
                placeholder={label} 
                value={value || ""} 
                onChange={onChange}>
            </input>
        </div>

    )
};

export default Checkbox;