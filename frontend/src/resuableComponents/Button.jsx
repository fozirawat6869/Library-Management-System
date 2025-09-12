

function Button({type,value,onClick,className=""}) {

  return (
     <button 
     type={type}
     value={value}
     className={className}
     onClick={onClick} 
     > 
     {value}
     </button>
  )
}

export default Button