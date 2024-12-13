import React, { useEffect, useRef, useState } from "react";

export function typingMarker() {}

export function useTypingEffect(
    text: string,
    interKeyStrokeDuration?: number, 	// ms's between 2 keystrokes
	rate: number = 1					// speed of typing (if interKeyStrokeDuration is not specified)
) {

	// if interKeyStrokeDuration is not specified, it should be based on the length of the text.

	interKeyStrokeDuration = interKeyStrokeDuration ?? (2000 / text.length * rate);

    const [curPos, setCurPos] = useState(0); 	//current index of textToType
    const curPosRef = useRef(0); 				//can be used inside useEffect without being a dependency

    useEffect(() => {
        /* Called ONCE when component calls useTypingEffect(). Starts an interval which
		increments curPos every <interKeyStrokeDuration> ms until greater than text length */
        const intervalID = setInterval(() => {
            /* Returns the unique interval ID. Called every
			<interKeyStrokeDuration> ms until clearInterval() is called */
            setCurPos(val => val + 1);
            curPosRef.current += 1;
            if (curPosRef.current >= text.length) {
                clearInterval(intervalID);
			}
        }, interKeyStrokeDuration);

        return () => {
            //clean-up old effect before new effect starts
            clearInterval(intervalID);
            curPosRef.current = 0;
            setCurPos(0);
        };
    }, []);

    //Return sub-string up to curPos
    return text.substring(0, curPos);
}

// Recursive component to apply typing effect
export function TypingEffectWrapper(props: {
    children: React.ReactNode;
    interKeyStrokeDuration?: number;
}) {
    const processNode = (node: React.ReactNode): React.ReactNode => {

		// If it's a string, apply typing effect
        if (typeof node === "string") {
            const typedText = useTypingEffect(node);
			return <>{typedText}</>
        }

        // If it's a React element, recursively process children
        if (React.isValidElement(node)) {
            return React.cloneElement(node, {
                ...node.props,
                children: React.Children.map(node.props.children, processNode),
            });
        }

        // If it's null or undefined, just return it
        return node;
    };

    return <>{React.Children.map(props.children, processNode)}</>;
}
