import { UserButton, auth } from "@clerk/nextjs";
import MobileSidebar from "./mobile-sidebar";

const Navbar = async () => {
    const { userId } = auth();

    const response = await fetch(`${process.env.PRODUCTION_BASE_URL || process.env.DEV_BASE_URL}/ai/limit/${userId}`);
    const { count, permission } = await response.json();

    return (
        <div className="flex items-center p-4">
            <MobileSidebar apiLimitCount={count} isPro={permission} userId={userId} />
            <div className="flex w-full justify-end">
                <UserButton afterSignOutUrl="/" />
            </div>
        </div>
    );
}

export default Navbar;