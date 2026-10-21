'use client'
import Image from "next/image";
import Postar from "./postar/page";
import Link from "next/link";

export default function Home() {
  return ( 
    <div> 
       <center><h1>Bem vindo ao meu blog</h1></center>
       <Link href="/posts">Ver posts</Link>
    </div>
  );
}
