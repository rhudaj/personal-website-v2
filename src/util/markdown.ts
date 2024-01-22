import { useEffect, useState } from "react";

export function get_markdown(url: string) {
  const [read, setRead] = useState<string>("");
  useEffect( () => {
    fetch( url )
      .then( response => {
          return response.text();
      }
    ).then( (text) => setRead(text) );
  }, [] );

  return read;
}