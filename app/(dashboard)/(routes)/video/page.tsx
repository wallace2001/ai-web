import { auth } from "@clerk/nextjs";
import VideoClient from "./client";

const VideoPage = () => {
    const { userId } = auth();

    return (
        <VideoClient userId={userId} />
    );
}

export default VideoPage;