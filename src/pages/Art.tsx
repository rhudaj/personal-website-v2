import './Art.css'
import images_json from '../assets/ART/photos.json'
import  React, { useState, useEffect, useRef } from 'react';

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

//----------------------------------------------------------------------

function Videos() {
  const [vidID, setVidID] = useState(1);
  const numVideos = useRef(8)

  const nextVid = () => {
    if(vidID == numVideos.current) setVidID(1)
    else setVidID(vidID + 1)
  };

  const prevVid = () => {
    if(vidID == 1) setVidID(numVideos.current)
    else setVidID(vidID - 1)
  };

  const getNext = () => {
    if(vidID == numVideos.current) return 1;
    else return vidID+1;
  };

  const getPrev = () => {
    if(vidID == 1) return numVideos;
    else return vidID-1;
  };


  return (
    <div id="VideoScroll">
        <div id="PreviousVideo" className="controls">
          <video key={vidID} muted={true}>
            <source src={`/videos/video${getPrev()}.mp4`} type="video/mp4"/>
          </video>
          <i className="fas fa-arrow-left" onClick={prevVid}/>
        </div>
        <div id="ActiveVideo">
          <video key={vidID} autoPlay={true} loop={true} muted={true}>
            <source src={`/videos/video${vidID}.mp4`} type="video/mp4"/>
          </video>
        </div>
        <div id="NextVideo" className="controls">
          <video key={vidID} muted={true}>
            <source src={`/videos/video${getNext()}.mp4`} type="video/mp4"/>
          </video>
          <i className="fas fa-arrow-right" onClick={nextVid}/>
        </div>
    </div>

  );
}

export function Art() {
  return (
    <div id="Art-Main-Div">
      <h1>Art</h1>
      <h2>Videos, 3D Design / Animation</h2>
      <Videos/>
      <h2>Photography</h2>
      <Images/>
    </div>
  );
}