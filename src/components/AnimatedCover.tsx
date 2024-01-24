import './AnimatedCover.css'

interface CoverProps {
  children: React.ReactNode;
};

// export function AnimatedCover(props: CoverProps) {
//   const [height, setHeight] = useState(0);
//   const heightRef = useRef(0); //can be used inside useEffect without being a dependency
//   const [isVisible, setIsVisible] = useState(props.visible);

//   if(props.visible && !isVisible) setIsVisible(true);
//   if(!props.visible && isVisible) setIsVisible(false);

//   useEffect(()=> {
//     if(isVisible) {
//       const intervalID = setInterval(()=> {
//         setHeight((val)=>val+1);
//         heightRef.current += 1;
//         if(heightRef.current >= 100) clearInterval(intervalID);
//       }, 0.1)
//       return ()=> {
//         clearInterval(intervalID);
//       }
//     } else {
//       const intervalID = setInterval(()=> {
//         setHeight((val)=>val-1);
//         heightRef.current -= 1;
//         if(heightRef.current <= 0) clearInterval(intervalID);
//       }, 0.1)
//       return ()=> {
//         clearInterval(intervalID);
//       }
//     }
//   }, [isVisible]);

//   const style: React.CSSProperties = {
//     height: `${height}%`
//   }

//   return (
//     <div className="AnimatedCover" style={style}>
//       {props.children}
//     </div>
//   );
// }

export function AnimatedCover(props: CoverProps) {
  return (
    <div className="AnimatedCover">
      {props.children}
    </div>
  );
}
