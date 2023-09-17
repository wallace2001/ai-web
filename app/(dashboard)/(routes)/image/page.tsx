import { auth } from "@clerk/nextjs";
import ImageClient from "./client";



const ImagePage = () => {
    const { userId } = auth();

    return (
        <ImageClient userId={userId} />
    );
}

export default ImagePage;