import { auth, currentUser } from "@clerk/nextjs";
import SettingsClient from "./client";

const SettingsPage = async () => {
    const user = await currentUser();

    const response = await fetch(`${process.env.PRODUCTION_BASE_URL || process.env.NEXT_PUBLIC_DEV_BASE_URL}/ckeck/subscription/${user?.id}`);
    const { permission } = await response.json();
    
    if (!user?.id && !user?.emailAddresses[0].emailAddress) {
        return null
    }

    return (
        <SettingsClient 
            email={user?.emailAddresses[0].emailAddress} 
            subscribe={permission} 
        />
    );
}
 
export default SettingsPage;