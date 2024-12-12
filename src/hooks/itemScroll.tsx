import React from "react";

/**
 * A collection of items that can be 'scrolled' through (left and right)
 * and loops back to the beginning when the end is reached.
 * @param items
 * @param start
 * @returns
 */
export function useItemScroll<T>(items: T[], start?: number) {

    const [_items, setItems] = React.useState<T[]>([]);
	const [cur, setCur] = React.useState<number>(start ?? -1);

    React.useEffect(()=>{
        setItems(items);
        console.log(`useItemScroll(${items})`)
    }, [items]);

    const toNext = () => {
        setCur(getNext());
    };

    const toPrev = () => {
        setCur(getPrev());
    };

    const get = (i?: number): T => {
        return _items[i ?? cur];
    };

    const getNext = () => {
        if (cur >= _items.length-1) return 0;
        else return cur + 1;
    };

    const getPrev = () => {
        if (cur <= 0) return _items.length-1;
        else return cur - 1;
    };

    return { toNext, toPrev, get, cur, setCur };
}