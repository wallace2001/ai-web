"use client";

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const testimonials = [
    {
        id: 1,
        name: "Wallace",
        avatar: 'W',
        title: "Developer",
        description: "Este é o melhor aplicativo que usei!"
    },
    {
        id: 2,
        name: "Yuri",
        avatar: 'W',
        title: "Developer",
        description: "Este é o melhor aplicativo que usei!"
    },
];

const LandingContent = () => {
    return (
        <div className="px-10 pb-20">
            <h2 className="text-center text-4xl text-white font-extrabold mb-10">
                Depoimentos
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {
                    testimonials.map(item => (
                        <Card key={item.id} className="bg-[#192339] border-none text-white">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-x-2">
                                    <div>
                                        <p className="text-lg">{item.name}</p>
                                        <p className="text-zinc-400 text-sm">{item.title}</p>
                                    </div>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="px-4">
                                {item.description}
                            </CardContent>
                        </Card>
                    ))
                }
            </div>
        </div>
    );
}

export default LandingContent;