import ModalProvider from "@/components/modal-provider";
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import { auth, currentUser } from "@clerk/nextjs";

const DashboardLayout = async ({
    children
}: {
    children: React.ReactNode
}) => {
    const { userId } = auth();
    const user = await currentUser();

    const response = await fetch(`${process.env.PRODUCTION_BASE_URL || process.env.DEV_BASE_URL}/ai/limit/${userId}`);
    const { count, permission } = await response.json();

    if (!user?.id && !user?.emailAddresses[0].emailAddress) {
        return null
    }

    return (
        <>
            <ModalProvider userId={user.id} email={user.emailAddresses[0].emailAddress} />
            <div className="h-full relative">
                <div
                    className="
                    hidden 
                    h-full 
                    md:flex 
                    md:w-72 
                    md:flex-col 
                    md:fixed 
                    md:inset-y-0 
                    bg-gray-900
                "
                >
                    <Sidebar userId={userId} isPro={permission} apiLimitCount={count} />
                </div>
                <main className="md:pl-72">
                    <Navbar />
                    {children}
                </main>
            </div>
        </>
    );
}

export default DashboardLayout;