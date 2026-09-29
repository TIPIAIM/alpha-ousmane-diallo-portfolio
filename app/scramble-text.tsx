'use client';
import { useEffect, useRef, useState } from 'react';
const chars='ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
export default function ScrambleText({text}:{text:string}) {
  const ref=useRef<HTMLSpanElement>(null);
  const [display,setDisplay]=useState(text);
  useEffect(()=>{
    setDisplay(text);
    if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
    const node=ref.current;if(!node)return;
    let interval:number|undefined,started=false;
    const observer=new IntersectionObserver(entries=>{
      if(!entries[0]?.isIntersecting||started)return;started=true;observer.disconnect();
      let frame=0;
      interval=window.setInterval(()=>{
        frame++;
        const locked=Math.floor(frame/18*text.length);
        setDisplay([...text].map((char,i)=>char===' '||i<locked?char:chars[Math.floor(Math.random()*chars.length)]).join(''));
        if(frame>=18){window.clearInterval(interval);setDisplay(text)}
      },34);
    },{threshold:.35});
    observer.observe(node);
    return()=>{observer.disconnect();if(interval)window.clearInterval(interval)};
  },[text]);
  return <span ref={ref} aria-label={text}><span aria-hidden="true">{display}</span></span>;
}
