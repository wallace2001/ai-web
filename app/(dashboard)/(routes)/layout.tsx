import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import { auth } from "@clerk/nextjs";

const DashboardLayout = async ({
    children
}: {
    children: React.ReactNode
}) => {
    const { userId } = auth();

    const response = await fetch(`${process.env.PRODUCTION_BASE_URL || process.env.DEV_BASE_URL}/ai/limit/${userId}`);
    const { count } = await response.json();

    return (
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
                <Sidebar userId={userId} apiLimitCount={count} />
            </div>
            <main className="md:pl-72">
                <Navbar />
                {children}
            </main>
        </div>
    );
}

export default DashboardLayout;