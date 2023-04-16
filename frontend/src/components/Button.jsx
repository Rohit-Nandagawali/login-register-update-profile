const Button = ({text}) => {
    return ( 
        <button className="p-2 w-full rounded-md my-4 bg-red-500 shadow-lg shadow-red-400/60 text-white hover:bg-red-400">{text}</button>
     );
}
 
export default Button;