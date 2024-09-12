"use client"

import { Axios } from "@/utils/Axios";
import React, { useEffect, useState } from "react";


export default function Test() {
    const [userInfo, setUserInfo] = useState("user")
    const getMe = async () => {
      const {data} = await Axios("http://localhost:3000/api/auth/me")
      if(data?.info){
        setUserInfo(data.info)
      } 
      
    };
  
    useEffect(() => {
      getMe();
    }, []);


    return (
        <div className="m-8 text-gray-300">
            user email   = {userInfo}
        </div>
    )
}