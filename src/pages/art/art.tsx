import "./art.sass";
import { loadJson } from "../../util/loadJson";
import { useState, useEffect } from "react";
import { useItemScroll } from "../../hooks/itemScroll";
import { FocusedView } from "../../components/focusedView/focusedView";
import { LazyLoadImage } from "react-lazy-load-image-component";

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

function Images(props: { urls: string[] }) {
	// Toggle for the view mode
    const [useScrollView, setUseScrollView] = useState<boolean>(false);
	// An object to store the images / state of scrolling them
    const imgScroll = useItemScroll<string>(props.urls);

    // TODO: reuse the same image already in the DOM when focused (otherwise, network request every time you focus on it)
    if (useScrollView) {
		// FocusedView: container that is center focused on the page
        return (
            <FocusedView onClose={() => setUseScrollView(false)}>
                <i
                    className="fas fa-arrow-left img-select"
                    onClick={imgScroll.toPrev}
                />
                <div id="FocusedViewImageContainer">
                    <img id={`scroll-view-image`} src={imgScroll.get()} />
                </div>
                <i
                    className="fas fa-arrow-right img-select"
                    onClick={imgScroll.toNext}
                />
            </FocusedView>
        );
    } else {
		// Grid of images
        return (
            <div id="ImageGrid">
                {props.urls.map((url: string, i: number) => (
					// Note: LazyLoadImage wraps an <img> with a span in the DOM
                    <LazyLoadImage
                        key={i}
						className="image-in-grid"
                        src={url}
                        onClick={() => {
                            imgScroll.setCur(i);
                            setUseScrollView(true);
                        }}
						// LazyLoadImage specific props:
						effect="blur"
                    />
                ))}
            </div>
        );
    }
}

//----------------------------------------------------------------------

function Videos(props: { paths: string[] }) {
    const vids = useItemScroll<string>(props.paths, 1);

    const DisplayVideo = (props: { path: string; isActive?: boolean }) => (
        <video
            autoPlay={props.isActive ?? false}
            loop={props.isActive ?? false}
            muted={true}
        >
            <source src={props.path} type="video/mp4" />
        </video>
    );

    return (
        <div id="VideoScroll">
            <div id="PreviousVideo" className="controls">
                <DisplayVideo key="vid1" path={vids.get(vids.cur - 1)} />
                <i className="fas fa-arrow-left" onClick={vids.toPrev} />
            </div>
            <div id="ActiveVideo">
                <DisplayVideo key="vid2" path={vids.get()} isActive />
            </div>
            <div id="NextVideo" className="controls">
                <DisplayVideo key="vid3" path={vids.get(vids.cur + 1)} />
                <i className="fas fa-arrow-right" onClick={vids.toNext} />
            </div>
        </div>
    );
}

export function Art() {
    const [imgURLs, setImgURLs] = useState<string[]>([]);
    const videoPaths = Array(8)
        .fill(0)
        .map((_, i) => `/videos/video${i + 1}.mp4`);

    // Load Assets
    useEffect(() => {
        loadJson<string[]>("images").then(setImgURLs);
    }, []);

    return (
        <div id="Art-Main-Div">
            <h1>Art</h1>
            <h2>Videos, 3D Design / Animation</h2>
            <Videos paths={videoPaths} />
            <h2>Photography</h2>
            <Images urls={imgURLs} />
        </div>
    );
}
