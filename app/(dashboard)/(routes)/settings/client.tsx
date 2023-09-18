"use client";

import Heading from "@/components/heading";
import SubscriptionButton from "@/components/subscription-button";
import { Settings } from "lucide-react";

interface ISettingsClient {
    userId: string;
    email: string;
    subscribe: boolean;
}

const SettingsClient = ({
    userId,
    email,
    subscribe
}: ISettingsClient) => {
    return (
        <div>
            <Heading 
                title="Settings"
                description="Manage account settings."
                icon={Settings}
                iconColor="text-gray-700"
                bgColor="bg-gray-700/10"
            />
            <div className="px-4 lg:px-8 space-y-4">
                <div className="text-muted-foreground text-sm">
                    {subscribe ? "You are currently on a pro plan." : "You are currently on a free plan."}
                </div>
                <SubscriptionButton userId={userId} email={email} isPro={subscribe} />
            </div>
        </div>
    );
}
 
export default SettingsClient;