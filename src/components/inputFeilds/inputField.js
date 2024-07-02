import React from "react";
import "./input.css"
const InputField = ({label,type,name,value,onChange,error})=>{
    return(
        <div className="form-group">
            {/* <label htmlFor={name}>{label}</label> */}
            <input
            type={type}
            name={name}
            id={name}
            value={value}
            placeholder={label}
            onChange={onChange}
            className={error ? 'form-control is-invalid':'form-control'}
            />
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    )
}
export default InputField;