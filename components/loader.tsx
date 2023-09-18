import Image from "next/image";

const Loader = () => {
    return ( 
        <div className="h-full flex flex-col gap-y-4 items-center">
            <div className="w-10 h-10 relative animate-spin">
                <Image
                    alt="logo"
                    fill
                    src="https://img.freepik.com/free-icon/robot_318-808683.jpg?w=2000"
                />
            </div> 
            <p className="text-sm text-muted-foreground">
                AI is thinking...
            </p>
        </div>
    );
}
 
export default Loader;