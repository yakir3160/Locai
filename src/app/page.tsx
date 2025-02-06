import Image from "next/image";
import Logo from "@/src/components/Logo";
import {ChatInterface} from "@/src/components/ChatInterface";

export default function Home() {
  return (
    <div className="container">
        <Logo />
        <ChatInterface />
    </div>
  );
}
