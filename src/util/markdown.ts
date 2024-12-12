import { useEffect, useState } from "react";

export function get_markdown(url: string) {
    const [md, setMD] = useState<string>("");

    useEffect(() => {
        fetch(url)
        .then(r => r.text())
        .then(setMD);
    }, []);

    return md;
}
