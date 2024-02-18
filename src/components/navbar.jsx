"use client"
import Link from "next/link";
import { useState, useEffect } from "react";

import Profile from "./profile";

const Navbar = ({logout,auths}) => {
  const [auth, setAuth] = useState(false)
  useEffect(() =>{
    if(auths) {
      setAuth(true)
    }else{
      setAuth(false)
    }
  },[auths])
  return (
    <div className="bg-slate-50 shadow-md px-3 flex rounded-md h-12 justify-center items-center fixed w-full top-0">
      <p className="w-1/5 font-black mt-2">amar hisab</p>

      <div className="flex bg-slate-95v w-4/5 h-full justify-center items-center">
        <ul className="flex justify-evenly w-full h-full">
          <Link
            href="/"
            className="w-20 text-center  h-full flex justify-center items-center "
          >
            <li className="bg-gray-200 w-full h-4/5 rounded-md shadow-md text-emerald-300 font-bold flex items-center justify-center">
              {" "}
              add
            </li>
          </Link>
          <Link
            href="/my"
            className="w-20  text-center  h-full flex justify-center items-center"
          >
            <li className="bg-gray-200 w-full h-4/5 rounded-md shadow-md text-emerald-300 font-bold flex items-center justify-center">
              my
            </li>
          </Link>

          <Link
            href="/alluser"
            className="w-20  text-center  h-full flex justify-center items-center"
          >
            <li className="bg-gray-200 w-full h-4/5 rounded-md shadow-md text-emerald-300 font-bold flex items-center justify-center">
              all
            </li>
          </Link>
        </ul>
        {auth ? <Profile logout={logout}  /> : <Link
          href="/login"
          className=" bg-green-300 h-5/6 text-center w-28 font-bold rounded-lg shadow-md text-red-300 flex justify-center items-center"
        >
          login
        </Link>}
      </div>
    </div>
  );
};

export default Navbar;
