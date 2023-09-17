import { auth } from "@clerk/nextjs";
import MusicClient from "./client";



const MusicPage = () => {
    const { userId } = auth();

    return (
        <MusicClient userId={userId} />
    );
}

export default MusicPage;