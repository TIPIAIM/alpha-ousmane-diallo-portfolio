'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
const KEY = 'portfolio-sound-enabled';
export function useSound() {
  const [enabled,setEnabled]=useState(false);
  const context=useRef<AudioContext|null>(null);
  const lastHover=useRef(0);
  useEffect(()=>{try{setEnabled(localStorage.getItem(KEY)==='true')}catch{};return()=>{void context.current?.close()}},[]);
  const toggle=useCallback(()=>setEnabled(v=>{try{localStorage.setItem(KEY,String(!v))}catch{};return !v}),[]);
  const play=useCallback((kind:'hover'|'click')=>{
    if(!enabled || typeof window==='undefined') return;
    const now=performance.now();
    if(kind==='hover' && now-lastHover.current<130)return;
    if(kind==='hover')lastHover.current=now;
    try{
      context.current ??= new AudioContext();
      const ctx=context.current;
      if(ctx.state==='suspended')void ctx.resume();
      const osc=ctx.createOscillator(),gain=ctx.createGain();
      osc.type='sine';
      osc.frequency.setValueAtTime(kind==='hover'?620:460,ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(kind==='hover'?760:580,ctx.currentTime+.07);
      gain.gain.setValueAtTime(.0001,ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(kind==='hover'?.015:.027,ctx.currentTime+.012);
      gain.gain.exponentialRampToValueAtTime(.0001,ctx.currentTime+.11);
      osc.connect(gain).connect(ctx.destination);osc.start();osc.stop(ctx.currentTime+.12);
    }catch{}
  },[enabled]);
  return {enabled,toggle,play};
}
