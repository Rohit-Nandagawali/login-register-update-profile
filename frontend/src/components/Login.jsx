import { useState, useEffect } from "react";
import Button from "./Button";
import { Link, useNavigate } from 'react-router-dom'

const Login = ({ SERVER_URL }) => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const [showPass, setShowPass] = useState(true)

    // handle show password
    const handleShowPass = () => {
        setShowPass(!showPass)
    }

    useEffect(() => {
        const auth = localStorage.getItem("user")
        if (auth) {
            navigate('/')
        }
    }, [])

    const loginUser = async () => {

        if (email && password) {

            let result = await fetch(`${SERVER_URL}/login`, {
                method: 'POST',
                body: JSON.stringify({ email, password }),
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            result = await result.json()

            console.warn(result);
            if (result.name) {
                localStorage.setItem('user', JSON.stringify(result))
                navigate('/')
                alert("Login Successful")
            } else {
                alert("Please enter correct details")
            }

        }
        else{
            alert("Please enter all details")
        }


    }

    return (
        <div className="h-screen bg-gradient-to-br from-indigo-200 via-red-200 to-yellow-100 flex items-center justify-center ">
            <div className=" w-[90%] md:w-[60%] lg:w-[30%] p-10 bg-white/40 backdrop-blur-sm rounded-lg shadow-lg border-white border-4">
                <h1 className="font-bold text-2xl text-center my-2">Hello Again</h1>
                <p className="text-sm text-center">Welcome back you've been missed!</p>
                <div className="flex flex-col">

                    <label className="text-base font-medium mt-1" htmlFor="email">Email</label>
                    <input id="email" className=" rounded-md p-2 my-1 outline-none" placeholder="abc@email.com" type="email" required onChange={(e) => setEmail(e.target.value)} />


                    <label className="text-base font-medium mt-1" htmlFor="password">Password</label>
                    <input id="password" className="rounded-md p-2 my-1 outline-none" placeholder="password" type={showPass ? 'password' : 'text'} required onChange={(e) => setPassword(e.target.value)} />

                    <div onClick={handleShowPass} className="text-xs cursor-pointer text-blue-600">
                        {!showPass ? 'Hide Password' : 'show Password'}
                    </div>

                    <div className="w-full" onClick={loginUser}>

                        <Button text={"Login"} />
                    </div>

                </div>
                <div className="flex text-sm justify-center">
                    <p>Not a member?</p>
                    <Link to={"/register"}><span className="text-blue-700 ml-2">Register now</span></Link>

                </div>
            </div>
        </div>
    );
}

export default Login;