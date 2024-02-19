"use client";

import { useEffect } from "react";

export default function Home() {
  const getMe = async () => {
    const res = await fetch("http://localhost:3000/api/auth/me", {
      method: "GET",
      cache: "no-store",
    });
    const data = await res.json();
    console.log(data.info);
  };

  useEffect(() => {
    getMe();
  });

  console.log("home page");

  return <div>HOME PAGE</div>;
}
