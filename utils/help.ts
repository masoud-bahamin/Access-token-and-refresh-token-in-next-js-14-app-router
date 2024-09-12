import { cookies } from "next/headers";


// function getCookie(name:string) {
//     const value = `; ${document.cookie}`;
//     const parts = value.split(`; ${name}=`);
//     const partOne= parts.pop()
//     if(partOne){
//         if (parts.length === 2) return partOne.split(';').shift();
//     } else {
//         return undefined
//     }

//   }


export function isExpired() {
    const Cookies = cookies()
    const expiredTimeCookie = Cookies.get("expired-token")?.value
    const date = new Date()
    const now = date.getTime()
    if (Number(expiredTimeCookie) > now) {
        return false
    }
    return true
}

export const getNewRefreshToken = async () => {
    const Cookies = cookies();
    const refreshTokenCookie = Cookies.get("refresh-token")
    const IsExpired = isExpired()
    if (IsExpired){
        const res = await fetch("/api/refresh-token")
        console.log(res);
        
    }
        return false
}

export const fetchWraper = async (url:string ,method : string  ) => {

    const IsExpiered = isExpired()

    if (IsExpiered) {
        const res = await fetch("http://localhost:3000/api/auth/refresh-token", {
            method: "POST",
        })
        const data = await res.json()
        console.log("daaaaaata", data);
        if (res.status === 200) {

        }
    }
    const res = await fetch(url , {
        method
    })
    return res
}