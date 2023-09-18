"use client";

import * as z from "zod";
import Heading from "@/components/heading";
import { Music } from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import { formSchema } from "./constants";
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Empty from "@/components/empty";
import Loader from "@/components/loader";
import { api } from "@/lib/axios";
import { useProModal } from "@/hooks/use-pro-modal";
import toast from "react-hot-toast";
import { useAuth } from "@clerk/nextjs";

const MusicPage= () => {

    const { userId } = useAuth();

    const proModal = useProModal();
    const router = useRouter();
    const [music, setMusic] = useState<string>();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: "",
        }
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const { data } = await api.post('/ai/music', {
                ...values,
                userId
            });

            setMusic(data.audio);
        } catch (error: any) {
            if(error?.response?.status === 403) {
                proModal.onOpen();
            } else {
                toast.error('Something wen wrong.')
            }
        } finally {
            form.reset();
            router.refresh();
        }
    }

    return (
        <div>
            <Heading
                title="Gerador de Música"
                description="Transforme seu prompt em uma música."
                icon={Music}
                iconColor="text-emerald-500"
                bgColor="bg-emerald-500/10"
            />
            <div className="px-4 lg:px-8">
                <FormProvider {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="
                rounded-lg 
                border 
                w-full 
                p-4 
                px-3 
                md:px-6 
                focus-within:shadow-sm
                grid
                grid-cols-8
                gap-2
              "
                    >
                        <FormField
                            name="prompt"
                            render={({ field }) => (
                                <FormItem className="col-span-12 lg:col-span-6">
                                    <FormControl className="m-0 p-0">
                                        <Input
                                            className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                                            disabled={isLoading}
                                            placeholder="Solo de Piano"
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <Button className="col-span-12 lg:col-span-2 w-full" type="submit" disabled={isLoading} size="icon">
                            Gerar
                        </Button>
                    </form>
                </FormProvider>
                {isLoading && (
                    <div className="p-20">
                        <Loader />
                    </div>
                )}
                {!music && !isLoading && (
                    <Empty label="Nenhuma música gerada." />
                )}
                {music && (
                    <audio controls className="w-full mt-8">
                        <source src={music} />
                    </audio>
                )}
            </div>
        </div>
    );
}

export default MusicPage;