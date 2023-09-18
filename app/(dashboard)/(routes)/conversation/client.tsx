"use client";

import * as z from "zod";
import Heading from "@/components/heading";
import { MessageSquare } from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useChat } from "ai/react";
import _ from "lodash";

import { formSchema } from "./constants";
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormEvent, useEffect, useRef } from "react";
import Empty from "@/components/empty";
import Loader from "@/components/loader";
import { cn } from "@/lib/utils";
import UserAvatar from "@/components/user-avatar";
import BotAvatar from "@/components/bot-avatar";
import { useProModal } from "@/hooks/use-pro-modal";
import ReactMarkdown from "react-markdown";

interface IMessage {
    role: string;
    content: string;
}


interface ConversationClientProps {
    userId: string | null;
}

const ConversationClient: React.FC<ConversationClientProps> = ({
    userId
}) => {

    const proModal = useProModal();
    const router = useRouter();
    const containerRef = useRef<HTMLDivElement>(null);
    const ref = useRef<HTMLFormElement>(null);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: "",
        }
    });

    const isLoading = form.formState.isSubmitting;

    const newMessages: IMessage[] = [];

    const { messages, input, handleInputChange, handleSubmit, error } = useChat({
        api: 'http://127.0.0.1:3333/ai/chat',
        body: {
            userId,
            messages: newMessages
        },
        headers: {
            'Content-Type': 'application/json'
        },
        onFinish: () => {
            router.refresh();
        }
    });

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const content = _.get(e, 'target[0].value', '');
            const userMessage = {
                role: 'user',
                content: content,
            };
            newMessages.push(...messages);
            newMessages.push(userMessage);

            handleSubmit(e);

        } catch (error: any) {
            console.log(error);
        } finally {
            form.reset();
        }
    }

    useEffect(() => {
        const container = containerRef.current;
        if (container?.scrollHeight) {
            container.scrollTop = container?.scrollHeight;
        }
    }, [messages]);

    useEffect(() => {
        if (error) {
            const dataError = JSON.parse(error?.message || '');
            if (dataError?.status === 403) {
                proModal.onOpen();
            }
        }
    }, [error]);

    return (
        <div>
            <Heading
                title="Conversation"
                description="Nosso modelo de conversação mais avançado."
                icon={MessageSquare}
                iconColor="text-violet-500"
                bgColor="bg-violet-500/10"
            />
            <div className="flex flex-col justify-between">
                <div className="h-[36rem] space-y-4 mt-4 mb-8">
                    {isLoading && (
                        <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
                            <Loader />
                        </div>
                    )}
                    {messages.length === 0 && !isLoading ? (
                        <Empty label="Nenhuma conversa iniciada" />
                    ) : (
                        <div ref={containerRef} className="overflow-auto flex flex-col gap-y-4 h-[36rem]">
                            {messages.map(message => (
                                <div
                                    key={message.content}
                                    className={cn(
                                        "p-8 w-full flex items-start gap-x-8 rounded-lg",
                                        message.role === "user" ? "bg-white border border-black/10" : "bg-muted"
                                    )}
                                >
                                    {message.role === 'user' ? (
                                        <>
                                            <UserAvatar />
                                            <p className="text-sm">
                                                {message.content}
                                            </p>
                                        </>
                                    ) : (
                                        <>
                                            <BotAvatar />
                                            <ReactMarkdown
                                                components={{
                                                    pre: ({ node, ...props }) => (
                                                        <div className="overflow-auto w-full my-2 bg-black/10 p-2 rounded-lg">
                                                            <pre {...props} />
                                                        </div>
                                                    ),
                                                    code: ({ node, ...props }) => (
                                                        <code className="bg-black/10 rounded-lg p-1" {...props} />
                                                    )
                                                }}
                                                className="text-sm overflow-hidden leadding-7"
                                            >
                                                {message.content || ''}
                                            </ReactMarkdown>
                                        </>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div className="px-4 lg:px-8">
                    <div>
                        <FormProvider {...form}>
                            <form
                                ref={ref}
                                onSubmit={onSubmit}
                                className="
                                rounded-lg
                                border
                                w-full
                                p-4
                                px-4
                                md:px-6
                                focus:within:shadow-sm
                                flex
                                justify-between
                                flex-col
                                sm:flex-row
                            "
                            >
                                <FormField
                                    name="prompt"
                                    render={({ field }) => (
                                        <FormItem className="flex-1 mr-4 col-span-12 lg:col-span-10">
                                            <FormControl className="m-0 p-0">
                                                <Input
                                                    {...field}
                                                    className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                                                    disabled={isLoading}
                                                    placeholder="Qual sua dúvida ?"
                                                    value={input}
                                                    onChange={handleInputChange}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <Button className="col-span-12 lg:span-2">
                                    Enviar
                                </Button>
                            </form>
                        </FormProvider>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ConversationClient;