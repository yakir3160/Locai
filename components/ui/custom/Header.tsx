
import ThemeToggle from "@/components/ui/custom/ThemeToggle";
import { Logo } from "@/components/ui/custom/Logo";
import {Switch} from "@/components/ui/switch";
import {Label} from "@/components/ui/label";

interface HeaderProps {

    isOnline: boolean;
    setIsOnline: (value: boolean) => void;

}
export const Header = ({isOnline ,setIsOnline} : HeaderProps) => {
    return (
        <header className="flex flex-col md:flex-row justify-between items-center p-4 bg-background fixed top-5 px-10 left-0 right-0 z-10">
            <Logo/>
            <div className={`flex items-center justify-between space-x-2 font-bold border transition-all duration-300 ${isOnline  ? " border-green-500" : "border-pink-500"}  p-2 rounded-full`}>
                <Switch id="online-mode" checked={isOnline} onCheckedChange={setIsOnline}/>
                <Label htmlFor="online-mode" className={`transition-all ${isOnline ? "text-green-500" : "bg-gradient-ai text-transparent bg-clip-text"} w-max`}>
                    {isOnline ? "Online" : "Local"}
                </Label>
            </div>
            <ThemeToggle/>
        </header>
    );
};
