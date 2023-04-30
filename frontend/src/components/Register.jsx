import { useState, useEffect } from "react";
import Button from "./Button";
import { Link, useNavigate } from 'react-router-dom'


const Register = ({ SERVER_URL }) => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const [showPass, setShowPass] = useState(true)

    // handle show password
    const handleShowPass = () => {
        setShowPass(!showPass)
    }

    // if already logged in then directly redirect to homepage
    useEffect(() => {
        const auth = localStorage.getItem("user")
        if (auth) {
            navigate('/')
        }
    }, [])


    // for registration
    const registerUser = async () => {
        console.log(name, email, password);
        if (name && email && password) {
            let result = await fetch(`${SERVER_URL}/register`, {
                method: 'POST',
                body: JSON.stringify({ name, email, password }),
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            result = await result.json()
            console.warn(result);

            if (result) {
                localStorage.setItem('user', JSON.stringify(result));
                navigate('/')
                alert("Registration successful")
            }
        }
        // if all field are not correctly field
        else{
            alert("Please enter all data")
        }

    }
    return (
        <div className="h-screen bg-gradient-to-br from-indigo-200 via-red-200 to-yellow-100 flex items-center justify-center ">
            <div className=" w-[90%] md:w-[60%] lg:w-[30%] p-10 bg-white/40 backdrop-blur-sm rounded-lg shadow-lg border-white border-4">

                <h1 className="font-bold text-2xl text-center my-2">Create an account</h1>
                <p className="text-sm text-center mb-1">Welcome, sign up now!</p>

                <div className="flex flex-col">
                    <label className="text-base font-medium mt-1" htmlFor="name">Your name</label>
                    <input id="name" className="rounded-md p-2 my-1 outline-none" placeholder="First Lastname" type="text" onChange={(e) => setName(e.target.value)} required />

                    <label className="text-base font-medium mt-1" htmlFor="email">Email</label>
                    <input id="email" className=" rounded-md p-2 my-1 outline-none" placeholder="abc@email.com" type="email" onChange={(e) => setEmail(e.target.value)} required />
                    <label className="text-base font-medium mt-1" htmlFor="password">Password</label>

                    {

                        <input id="password" className="rounded-md p-2 my-1 outline-none" placeholder="password" type={showPass ? 'password' : 'text'} onChange={(e) => setPassword(e.target.value)} required />
                    }
                    <div onClick={handleShowPass} className="text-xs cursor-pointer text-blue-600">
                        {!showPass ? 'Hide Password' : 'show Password'}
                    </div>

                    <div className="w-full" onClick={registerUser}  >
                        <Button text={"Create an account"} />
                    </div>


                </div>
                <div className="flex text-sm justify-center">
                    <p>Already a member?</p>
                    <Link to={"/login"}><span className="text-blue-700 ml-2">Login</span>
                    </Link>

                </div>
            </div>
        </div>
    );
}

export default Register;