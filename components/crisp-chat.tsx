import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

export const CrispChat = () => {
    
    useEffect(() => {
        Crisp.configure("73be22c3-48bd-4606-8fe5-b221728dbcb7");
    }, []);

    return null;
};