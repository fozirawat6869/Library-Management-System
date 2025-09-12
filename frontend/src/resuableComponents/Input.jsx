

function Input({name,type,placeholder,className="",onChange,onBlur,value,maxLength,onInput}) {
  return (
    <input 
    // pattern={pattern}
    maxLength={maxLength}
    onInput={onInput}
    name={name}
      type={type}
      placeholder={placeholder}
      className={className}
      onChange={onChange}
      onBlur={onBlur}
      value={value}
    />
  )
}

export default Input