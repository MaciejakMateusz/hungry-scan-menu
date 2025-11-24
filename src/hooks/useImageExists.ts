import {useEffect, useState} from "react";
import {s3BucketUrl} from "../apiData.ts";

export const useImageExists = (id: number | string) => {
    const [exists, setExists] = useState<boolean | null>(null);

    useEffect(() => {
        let active = true;
        const url = `${s3BucketUrl}/${id}.png?cb=${Date.now()}`;
        const img = new Image();

        img.src = url;
        img.onload = () => {
            if (active) setExists(true);
        };
        img.onerror = () => {
            if (active) setExists(false);
        };

        return () => {
            active = false;
        };
    }, [id]);

    return exists;
}