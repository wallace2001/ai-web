import { Card } from "@/components/ui/card";
import { tools } from "@/constants";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import Link from "next/link";


const DashboardPage = () => {
    return (
        <div>
            <div className="mb-8 space-y-4">
                <h2 className="text-2xl md:text-4xl font-bold text-center">
                    Explore o poder da IA
                </h2>
                <p className="text-muted-foreground font-light text-sm md:text-lg text-center">
                    Converse com a IA mais inteligente - Experimente o poder da IA
                </p>
            </div>
            <div className="px-4 md:px-20 lg:px32 space-y-4">
                {tools.map(tool => (
                    <Link href={tool.href} className="p-4">
                        <Card
                            key={tool.href}
                            className="border-black/5 flex items-center justify-between hover:shadow-md transition cursor-pointer"
                        >
                            <div className="flex items-center gap-x-4">
                                <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                                    <tool.icon className={cn("w-8 h-8", tool.color)} />
                                </div>
                                <div className="font-semibold">
                                    {tool.label}
                                </div>
                            </div>
                            <ArrowRight className="w-5 h-5 mr-2" />
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default DashboardPage;