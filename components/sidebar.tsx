"use client";

import { cn } from "@/lib/utils";
import { Code, ImageIcon, LayoutDashboard, MessageSquare, Music, Settings, VideoIcon } from "lucide-react";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import useSWR, { preload } from 'swr';
import { usePathname } from "next/navigation";
import FreeCounter from "./free-counter";
import { fetcher } from "@/lib/fetchet";
import { useAuth } from "@clerk/nextjs";

interface SidebarProps {
    isPro: boolean;
    apiLimitCount: number;
}

const montserrat = Montserrat({ weight: "600", subsets: ["latin"] });

const routes = [
    {
        label: 'Dashboard',
        icon: LayoutDashboard,
        href: '/dashboard',
        color: 'text-sky-500'
    },
    {
        label: 'Chat AI',
        icon: MessageSquare,
        href: '/conversation',
        color: 'text-violet-500'
    },
    {
        label: 'Gerador de Imagem',
        icon: ImageIcon,
        href: '/image',
        color: 'text-pink-500'
    },
    // {
    //     label: 'Video Generation',
    //     icon: VideoIcon,
    //     href: '/video',
    //     color: 'text-orange-500'
    // },
    // {
    //     label: 'Music Generation',
    //     icon: Music,
    //     href: '/music',
    //     color: 'text-emerald-500'
    // },
    {
        label: 'Settings',
        icon: Settings,
        href: '/settings',
        color: 'text-green-700'
    },
];

const Sidebar = ({
    apiLimitCount,
    isPro
}: SidebarProps) => {
    const { userId } = useAuth();

    const pathname = usePathname();
    const { data, error, isLoading } = useSWR(`${process.env.NEXT_PUBLIC_DEV_BASE_URL}/ai/limit/${userId}`, fetcher);

    return ( 
        <div className="space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white">
            <div className="px-3 py-2 flex-1">
                <Link href='/dashboard' className="flex items-center pl-3 mb-14">
                    <div className="relative w-8 h-8 mr-4">
                        <Image 
                            fill
                            alt="Logo"
                            src="https://img.freepik.com/free-icon/robot_318-808683.jpg?w=2000"
                        />
                    </div>
                    <h1 className={cn("text-2xl font-bold", montserrat.className)}>
                        AI
                    </h1>
                </Link>
                <div className="space-y-1">
                    {routes.map((route) => (
                        <Link
                            href={route.href}
                            key={route.href}
                            className={
                                cn("text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
                                pathname === route.href ? "text-white bg-white/10" : "text-zinc-400")
                            }
                        >
                            <div className="flex items-center flex-1">
                                <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                                {route.label}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
            <FreeCounter
                isPro={isPro}
                apiLimitCount={data?.count | apiLimitCount}
            />
        </div>
    );
}
 
export default Sidebar;