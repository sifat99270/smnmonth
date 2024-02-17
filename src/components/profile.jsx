"use client"
import { error, success } from '@/utilities/tosthandler';
import Link from 'next/link'
import React, { useRef } from 'react'
export default  function Profile({logout}) {
    const ref = useRef();
    function toggle() {
        if (ref.current.classList.contains('left-72')) {
            ref.current.classList.replace('left-72', 'right-1')
        } else {
            ref.current.classList.replace('right-1', 'left-72')
        }
    }

    // async function logout() {
    //     const res = await fetch('/api/user/logout', {
    //         method: "POST",
    //         headers: {
    //             "content-type": "application/json"
    //         }
    //     })

    //     const data = await res.json();
    //     if (data['status'] === "success") {
    //         success("logout successful")
    //         window.location.href = '/login'
    //     } else {
    //         error('logout fail')
    //     }
    // }
    return (
        <div className=' mt-1 relative '>
            <div onClick={toggle} className='cursor-pointer flex justify-center items-center rounded-full shadow-md shadow-gray-200 w-10 h-10 bg-slate-300 text-orange-300 text-3xl leading-10 '>
                <i className=" bi bi-person-circle"></i>
            </div>
            <div ref={ref} className=' top-12 left-72 absolute rounded-md shadow-md  shadow-gray-200 w-72 bg-black text-white font-extrabold '>
                <Link href="">
                    <div className='rounded-md shadow-md shadow-gray-200 bg-black p-2 my-1 mx-1'>
                        upload photo
                    </div>
                </Link>
                <hr ></hr>
                <div onClick={async()=>{
                    let data=await logout();
                    if(data['status']==='success'){
                        window.location.href='/login';
                    }
                }} className=' cursor-pointer flex justify-between rounded-md shadow-md shadow-gray-200 bg-neutral-400 mx-1 p-2 my-1'>
                    <p>logout</p>
                    <i className="bi bi-box-arrow-in-right"></i>
                </div>
                <hr ></hr>
            </div>
        </div>
    )
}
