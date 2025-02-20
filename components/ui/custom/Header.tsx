import { useChatStore } from '@/src/store/chatStore';
import ThemeToggle from "@/components/ui/custom/ThemeToggle";
import { Logo } from "@/components/ui/custom/Logo";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const OnlineSwitch = () => {
    const { isOnline, setIsOnline } = useChatStore();

    return (
        <div className={`flex items-center justify-between space-x-2 font-bold border transition-all duration-300 mt-2 md:mt-0
            ${isOnline ? "border-green-500" : "border-pink-500"} p-2 rounded-3xl`}>
            <Switch id="online-mode" checked={isOnline} onCheckedChange={setIsOnline} />
            <Label htmlFor="online-mode"
                   className={`transition-all ${isOnline ? "text-green-500" : "bg-gradient-ai text-transparent bg-clip-text"} w-max`}>
                {isOnline ? "Online" : "Local"}
            </Label>
        </div>
    );
};

export const Header = () => {
    return (
        <>
            {/* Desktop Header */}
            <header className="hidden md:flex justify-between items-center p-4 bg-background fixed pt-6 px-10 left-0 right-0 z-10">
                <div className="flex w-full justify-between items-center space-x-4">
                    <Logo />
                    <div className="flex items-center space-x-4">
                        <OnlineSwitch />
                        <ThemeToggle />
                    </div>
                </div>
            </header>

            {/* Mobile Header */}
            <header className="md:hidden flex flex-col items-center bg-background fixed pt-3 px-6 left-0 right-0 z-10">
                <div className="-top-1 right-0 absolute p-4 pr-5">
                    <ThemeToggle />
                </div>
                <div className="w-full flex justify-center items-center ">
                    <Logo />
                </div>
                <OnlineSwitch />
            </header>
        </>
    );
};