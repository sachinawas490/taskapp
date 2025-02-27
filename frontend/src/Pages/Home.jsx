import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import { url } from '../utils/data';
export default function Home() {
    const [todo, setTodo] = useState('')
    const navigate=useNavigate();
    const token=localStorage.getItem('userToken')
    async function handleClick(){
        if(!token){
            navigate('/')
        }else{
            let data={todo}
            console.log(data)
            const response=await axios.post(`${url}/todos/todo`,data,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            console.log(response)
        }
    }
    return (
        <div className='bg-slate-50 text-black'>
            <h2 className='text-[40px] text-center mt-8 bg-slate-200 py-4 rounded-xl mx-5'>Todo app</h2>

            <div className="flex  flex-col border-2 border-slate-950 mx-5 mt-5 min-h-[200px] items-center ">
                <input type="text"
                name='todo'
                value={todo}
                onChange={e=>setTodo(e.target.value)}
                className='text-black w-[50%] border-2 border-slate-900 p-3 rounded-md mt-5' placeholder='enter your todo' />
                <button onClick={handleClick} className='bg-blue-600 px-10 text-[23px] py-2 mt-4 rounded-md text-white'>Add</button>
            </div>
        </div>
    )
}
