import { auth } from "@clerk/nextjs";
import CodeClient from "./client";



const CodePage = () => {
    const { userId } = auth();

    return (
        <CodeClient userId={userId} />
    );
}

export default CodePage;