import {useEffect, useState} from "react";
import {s3BucketUrl} from "../apiData.ts";

type HookProps = {
    id: string | number;
    updated: Date | string;
}

export const useImageExists = (obj: HookProps) => {
    const [exists, setExists] = useState<boolean | null>(null);
    const id = obj?.id ?? 0;
    const updatedAt = obj?.updated;

    useEffect(() => {
        let active = true;
        const url = `${s3BucketUrl}/${id}.png?cb=${updatedAt}`;
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
    }, [id, updatedAt]);

    return exists;
}