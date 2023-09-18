"use client";

import { useEffect, useState } from "react";
import ProModal from "./pro-modal";
import { User } from "@clerk/nextjs/server";

const ModalProvider = ({
    email
}: {email: string}) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if(!mounted) {
        return null;
    }
    return ( 
        <>
            <ProModal email={email} />
        </>
     );
}
 
export default ModalProvider;