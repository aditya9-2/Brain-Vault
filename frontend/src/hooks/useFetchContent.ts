import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

interface Content {
    type: string;
    link: string;
    title: string;
}

const useFetchContent = () => {
    const [contents, setContents] = useState<Content[]>([]);

    const reFetchContent = () => {
        axios.get(`${BACKEND_URL}/api/v1/content`, {
            headers: {
                Authorization: localStorage.getItem("token"),
            },
        }).then((response) => {
            setContents(response.data.content);
        }).catch((err) => {
            console.log(`Unable to get contents: ${err}`);
        });
    }

    useEffect(() => {

        reFetchContent();

        const interval = setInterval(() => {

            reFetchContent();

        }, 5 * 1000);

        return () => {
            clearInterval(interval);
        }

    }, []);


    return { contents, reFetchContent };
};

export default useFetchContent;
