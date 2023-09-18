"use client";

import { Zap } from "lucide-react";
import { Button } from "./ui/button";
import { api } from "@/lib/axios";
import { useState } from "react";

interface SubscriptionButtonProps {
    isPro: boolean;
    userId: string;
    email: string;
}

const SubscriptionButton = ({
    isPro,
    userId,
    email
}: SubscriptionButtonProps) => {
    const [loading, setLoading] = useState(false);

    const onClick = async () => {

        try {
            setLoading(true);
            const response = await api.get(`/stripe?userId=${userId}&email=${email}`);

            window.location.href = response.data.url;
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <Button onClick={onClick} disabled={loading} variant={isPro ? "default" : "premium"}>
            {isPro ? "Gerenciar assinatura" : "Upgrade"}
            {!isPro && <Zap className="w-4 h-4 ml-2 fill-white" />}
        </Button>
    );
}
 
export default SubscriptionButton;