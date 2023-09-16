import { auth } from "@clerk/nextjs";
import ConversationClient from "./client";



const ConversationPage = () => {
    const { userId } = auth();

    return (
        <ConversationClient userId={userId} />
    );
}

export default ConversationPage;