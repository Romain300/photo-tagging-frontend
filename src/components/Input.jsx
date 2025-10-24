function Checkbox({ label, checked, name, id, onChange }) {
    
    return (
        <div>
            
            <input 
                id={id} 
                checked={checked}
                type="checkbox" 
                name={name} 
                onChange={onChange} 
            />
            <label htmlFor={id}>
                {label}
            </label>
        </div>

    )
};

export default Checkbox;