import axios from "axios";

const baseURL = "http://localhost:3000/api/"

export const Axios = axios.create({
    baseURL
})

function getCookie(name: string) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    const partOne = parts.pop()
    if (partOne) {
        if (parts.length === 2) return partOne.split(';').shift();
    }
}

function isExpired() {
    const expiredTimeCookie = getCookie("expired-token")
    const date = new Date()
    const now = date.getTime()
    if (expiredTimeCookie) {
        return true
    }
    if (Number(expiredTimeCookie) > now) {
        return false
    }
    return true
}

Axios.interceptors.request.use(async (req) => {
    console.log("axios req", req);
    const IsExpired = isExpired()
    if (IsExpired) {
        const res = await fetch("http://localhost:3000/api/auth/refresh-token", {
            method: "POST",
        })
        if(res.status === 200){
            const data = await res.json()
            console.log(data);         
        }  
    }
    return req
}, (err) => {
    console.log("axios error", err);
    return err
})

Axios.interceptors.response.use((res) => {
    console.log("axios req", res);
    return res
}, (err) => {
    console.log("axios error", err);
    return err
})