import React from "react";

const InputField = ({label,type,name,value,onChange,error})=>{
    return(
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <input
            type={type}
            name={name}
            id={name}
            value={value}
            onChange={onChange}
            className={error ? 'form-control is-invalid':'form-control'}
            />
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    )
}
export default InputField;