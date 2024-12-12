import { loadJson } from "../../util/loadJson";
import "./art.css";
import React, { useState, useEffect, useRef } from "react";

const FocusedView = (props: {
	id: any,
	src: string,
	onNext: () => void,
	onPrev: () => void,
	onClose: () => void,
}) => {
	return (
		<div id="ScreenCover">
			<div className="PopUp">
				<span className="x2close" onClick={props.onClose}>X</span>
				<div>
					<i className="fas fa-arrow-left img-select" onClick={props.onPrev} />
					<div id="ImageContainer">
						<img id={props.id} src={props.src} />
					</div>
					<i className="fas fa-arrow-right img-select" onClick={props.onNext} />
				</div>
			</div>
		</div>
	);
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

const Images = (props: { urls: string[] }) => {

	const [imgUrls, _] = useState<string[]>(props.urls);
	const [activeImg, setActiveImg] = useState<number>(-1);

    const nextImg = () => {
        if (activeImg >= imgUrls.length-1) setActiveImg(0);
        else setActiveImg(prev => prev + 1);
    };

    const prevImg = () => {
        if (activeImg <= 0) setActiveImg(imgUrls.length-1);
        else setActiveImg(prev => prev - 1);
    };

	useEffect(() => {
		console.log("New active image:", activeImg, " url: ", props.urls[activeImg]);
		document.body.style.overflow = (activeImg != -1) ? "hidden" : "auto";
	}, [activeImg]);

	if (activeImg != -1) {
		return (
			<FocusedView
				id={`image-${activeImg}`}
				src={props.urls[activeImg]}
				onNext={nextImg}
				onPrev={prevImg}
				onClose={() => setActiveImg(-1)}
			/>
		);
	} else return (
        <div id="ImageDisplay">
            {props.urls.map((url: string, i: number) => (
				<img
					key={i}
					id={`image-${i}`}
					src={url}
					onClick={() => setActiveImg(i)}
				/>
			))}
        </div>
    );
};

//----------------------------------------------------------------------

const Videos: React.FC<{}> = () => {
    const [vidID, setVidID] = useState(1);
    const numVideos = useRef(8); // *** constant, set

	const videos_path = "/videos"; // relative to 'public' folder

    const nextVid = () => {
        if (vidID == numVideos.current) setVidID(1);
        else setVidID(vidID + 1);
    };

    const prevVid = () => {
        if (vidID == 1) setVidID(numVideos.current);
        else setVidID(vidID - 1);
    };

    const getNext = () => {
        if (vidID == numVideos.current) return 1;
        else return vidID + 1;
    };

    const getPrev = () => {
        if (vidID == 1) return numVideos.current;
        else return vidID - 1;
    };

    const get_videoPath = (id: number) => {
        return `${videos_path}/video${id}.mp4`;
    };

    return (
        <div id="VideoScroll">
            <div id="PreviousVideo" className="controls">
                <video key={vidID} muted={true}>
                    <source src={get_videoPath(getPrev())} type="video/mp4" />
                </video>
                <i className="fas fa-arrow-left" onClick={prevVid} />
            </div>
            <div id="ActiveVideo">
                <video key={vidID} autoPlay={true} loop={true} muted={true}>
                    <source src={get_videoPath(vidID)} type="video/mp4" />
                </video>
            </div>
            <div id="NextVideo" className="controls">
                <video key={vidID} muted={true}>
                    <source src={get_videoPath(getNext())} type="video/mp4" />
                </video>
                <i className="fas fa-arrow-right" onClick={nextVid} />
            </div>
        </div>
    );
};

export function Art() {

	const [imgURLs, setImgURLs] = useState<string[]>([]);

	// Load Assets
	useEffect(() => {
		loadJson<string[]>('images').then(urls => setImgURLs(urls));
	}, []);

    return (
        <div id="Art-Main-Div">
            <h1>Art</h1>
            <h2>Videos, 3D Design / Animation</h2>
            <Videos />
            <h2>Photography</h2>
            <Images urls={imgURLs}/>
        </div>
    );
}
