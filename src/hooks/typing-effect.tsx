import { useEffect, useRef, useState } from "react";

export function typingMarker() {

}

export function useTypingEffect(
  textToType: string,
  interKeyStrokeDuration: number //ms's between 2 keystrokes
) {
  const [curPos, setCurPos] = useState(0); //current index of textToType
  const curPosRef = useRef(0); //can be used inside useEffect without being a dependency

  useEffect(()=> {
    // Called ONCE when component calls useTypingEffect(). Starts an interval which increments curPos every <interKeyStrokeDuration> ms until greater than text length
    const intervalID = setInterval(()=> {
      /*
        Returns the unique interval ID
        Called every <interKeyStrokeDuration> ms until clearInterval() is called
      */
     console.log('setInterval()')
      setCurPos((val)=>val+1);
      curPosRef.current += 1;
      if(curPosRef.current >= textToType.length) clearInterval(intervalID);
    }, interKeyStrokeDuration)

    return ()=> {
      //clean-up old effect before new effect starts
      clearInterval(intervalID);
      curPosRef.current = 0;
      setCurPos(0);
    }
  }, []);

  //Return sub-string up to curPos
  return textToType.substring(0, curPos);
}

export function useCoverEffect(
  max:number,
  time: number
) {
  const [curPos, setCurPos] = useState(0);
  const curPosRef = useRef(0);

  const handleStart = () => {
    // Called ONCE when component calls useTypingEffect()
    const intervalID = setInterval(()=> {
      setCurPos((val)=>val+1);
      curPosRef.current += 1;
      if(curPosRef.current >= max) clearInterval(intervalID);
    }, 10)
  };

  //Return sub-string up to curPos
  return { curPos, handleStart };
}
