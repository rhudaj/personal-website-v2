import './Art.css'
import images_json from '../assets/ART/photos.json'
import React, { useEffect, useState } from 'react';

interface ImageProps {
  id: string;
  src: string;
};

function FocusedImage(props: {children: React.ReactNode, handleClose: ()=>void}) {
  return (
    <div id="ScreenCover">
      <div className='PopUp'>
        <div id="ImageContainer">
          <span className='x2close' onClick={props.handleClose}>X</span>
          { props.children }
        </div>
      </div>
    </div>
  );
}

function ClickableImage(props: ImageProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(()=>{
    if(isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen])

  const Regular = () => {
    return (
      <img id={props.id} src={props.src} onClick={()=>setIsOpen(true)}/>
    );
  };

  const Focused = () => {
    return (
      <FocusedImage handleClose={()=>setIsOpen(false)}>
        <Regular/>
      </FocusedImage>
    );
  };

  if(isOpen) return <Focused/>
  else return <Regular/>
}

function Images() {

  const outputImages = () => {
    return images_json.map((link, index)=>{
      return (
        <ClickableImage id={`image-${index}`} src={link}/>
      );
    })
  }

  // RENDER
  return (
    <div id="ImageDisplay">
      { outputImages() }
    </div>
  );
}

export function Art() {
  return (
    <div id="Art-Main-Div">
      <h1>Art</h1>
      <h2>Photography</h2>
      <Images/>
    </div>
  );
}