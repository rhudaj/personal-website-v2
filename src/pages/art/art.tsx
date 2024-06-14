import './art.css'
import images_json from '../../assets/images.json'
import  React, { useState, useEffect, useRef } from 'react';

interface ImageProps {
  id: string;
  src: string;
};

interface FocusedImageProps {
  children: React.ReactNode,
  handleClose: ()=>void
};

const FocusedImage: React.FC<FocusedImageProps> = (props: FocusedImageProps) => {
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

const ClickableImage: React.FC<ImageProps> = (props: ImageProps) => {
  const [isOpen, setIsOpen] = useState(false);

  // prevent scrolling when an image is focused
  useEffect(()=>{
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

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

  return isOpen ? <Focused/> : <Regular/>
};


/* Version 2.0: getting images via http-request
const Images: React.FC<{}> = () => {
  const [imageUrls, setImageUrls] = useState<string[]>([]);   // image URLs
  const [loading, setLoading] = useState<boolean>(true);      // loading status

  const fetchImages = async () => {
    try {
      const urls = await getVSCOimageURLs();
      setImageUrls(urls);
    } catch (error) {
      console.error('Failed to fetch VSCO image URLs:', error);
    } finally {
      setLoading(false);
    }
  };

  // called when the component mounts
  useEffect(() => {
    fetchImages();
  }, []);

  const outputImages = () => {
    return imageUrls.map((link, index) => (
      <ClickableImage key={index} id={`image-${index}`} src={link} />
    ));
  };

  if (loading) {
    return ( <div>Loading...</div> );
  } else {
    return (
      <div id="ImageDisplay">
        {outputImages()}
      </div>
    );
  }
};
*/

const Images: React.FC<{}> = () => {
  return (
    <div id="ImageDisplay">
      {
        images_json.map((link: string, i: number) => {
          const l = link.replace('http:', 'https://');
          return <ClickableImage key={i} id={`image-${i}`} src={l} />
        }
        )
      }
    </div>
  );
};


//----------------------------------------------------------------------

const Videos: React.FC<{}> = () => {
  const [vidID, setVidID] = useState(1);
  const numVideos = useRef( 8 );          // *** constant, set

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
    if(vidID == 1) return numVideos.current;
    else return vidID-1;
  };

  const videos_path = '/videos';    // relative to 'public' folder
  const get_videoPath = (id: number) => {
    return `${videos_path}/video${id}.mp4`
  };

  return (
    <div id="VideoScroll">
        <div id="PreviousVideo" className="controls">
          <video key={vidID} muted={true}>
            <source src={get_videoPath(getPrev())} type="video/mp4"/>
          </video>
          <i className="fas fa-arrow-left" onClick={prevVid}/>
        </div>
        <div id="ActiveVideo">
          <video key={vidID} autoPlay={true} loop={true} muted={true}>
            <source src={get_videoPath(vidID)} type="video/mp4"/>
          </video>
        </div>
        <div id="NextVideo" className="controls">
          <video key={vidID} muted={true}>
            <source src={get_videoPath(getNext())} type="video/mp4"/>
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