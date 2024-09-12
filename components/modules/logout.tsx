"use client"

import { Axios } from "@/utils/Axios"


export default function Logout() {

    const logout = async () => {
        try {
            const { data } = await Axios.post("/auth/logout")
            console.log(data);
            window.location.reload()
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <button
            onClick={logout}
            className="bg-rose-500 text-white p-3 m-5 rounded-lg text-base hover:bg-rose-300">log out</button>
    )
}