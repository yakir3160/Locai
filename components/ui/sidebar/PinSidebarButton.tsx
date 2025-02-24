'use client'

import {Pin} from "lucide-react";
import {useChatStore} from "@/src/store/chatStore";


export const  PinSidebarButton = () => {

    const {setShowHistory ,pinedSidebar, setPinedSidebar} = useChatStore()
    return (
        <button
            onClick={() => {
                setPinedSidebar(!pinedSidebar)
                setShowHistory(true)
            }}
            className="absolute bottom-0.5 right-2 p-2 focus:outline-none text-pink-500 z-50"
        >
            {pinedSidebar ?
                <Pin className="size-7" /> :
                <Pin className="size-7 rotate-3" />
            }
        </button>
    )
}