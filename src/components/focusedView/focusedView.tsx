import './focusedView.sass'
import React from "react";

export const FocusedView = (props: {
	id?: any,
	onClose: () => void,
	children?: React.ReactNode
}) => {

	React.useEffect(() => {
		// On mount, disable scrolling in the background
		document.body.style.overflow = "hidden";
		// On unmount, re-enable scrolling
		return () => {
			document.body.style.overflow = "auto";
		};
	}, []);

	return (
		<div className="ScreenCover" id={props.id}>
			<div className="PopUp">
				<span className="x2close" onClick={props.onClose}>X</span>
				<div className="focused-content">
					{props.children}
				</div>
			</div>
		</div>
	);
};
