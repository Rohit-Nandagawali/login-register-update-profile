import { useState } from "react";
import Button from "./Button";
import { Link } from "react-router-dom";


const Home = ({SERVER_URL}) => {
    const auth= localStorage.getItem('user')
    
    const [name,setName] = useState(JSON.parse(auth).name)

    const id=JSON.parse(auth)._id
    const email=JSON.parse(auth).email
    const [password,setPassword] = useState("")


    const [isClicked, setIsClicked] = useState(false)

    const logout=()=>{
        localStorage.clear()
        alert("Logout Successfully")
    }

    const updateProfile =async ()=>{
        localStorage.setItem('user',JSON.stringify({name}))
        let result =await fetch(`${SERVER_URL}/${id}`,{
            method: 'PUT',
            body: JSON.stringify({name,password}),
            headers: {
                'Content-Type': 'application/json'
            },
        })
        result =await result.json()
        console.log(result);
        alert("Profile Update successfully")
    }

    return (
        <div className="h-screen bg-gradient-to-br from-indigo-200 via-red-200 to-yellow-100 flex items-center justify-center px-5 flex-col lg:flex-row">

            <div className=" w-[90%] md:w-[60%] lg:w-[30%] p-10 bg-white/40 backdrop-blur-sm rounded-lg shadow-lg border-white border-4 duration-100">
                <div className="flex justify-between">
                    <h1 className="font-bold text-2xl  my-2">Your details</h1>

                    <button onClick={() => setIsClicked(!isClicked)} className="flex px-2 rounded-lg text-white hover:bg-blue-400 bg-blue-500 items-center ">{!isClicked ? 'Edit' : 'Back'}</button>

                </div>
                <div className="flex flex-col">

                    <label className="text-base font-medium mt-1" htmlFor="Name">Name</label>
                    <input id="Name" className='rounded-md p-2 my-1 outline-none ' value={name} placeholder="abc@email.com" type="text" onChange={(e)=>setName(e.target.value)} disabled={isClicked ? false : true} required />

                    <label className="text-base font-medium mt-1" htmlFor="email">Email</label>
                    <input id="email" className=" rounded-md p-2 my-1 outline-none" placeholder="abc@email.com"  value={email} type="text" required disabled />

                    {
                        isClicked &&  <div className="flex flex-col">
                        <label className="text-base font-medium mt-1" htmlFor="password">Change password</label>
                        <input id="password" className="rounded-md p-2 my-1 outline-none" placeholder="Enter new password" onChange={(e)=>setPassword(e.target.value)} type="text" required disabled={isClicked ? false : true} />
                    </div>
                    }
                    {isClicked && <div onClick={updateProfile}><Button text={"Save changes"} /></div> }

                </div>
            </div>

           <Link to={'/register'} onClick={logout}> <div className="m-5 cursor-pointer bg-red-500 p-3 text-white rounded-full flex items-center justify-center shadow-xl">Logout</div></Link>
        </div>
    );
}

export default Home;