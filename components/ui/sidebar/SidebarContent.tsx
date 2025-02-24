import { useChatStore } from '@/src/store/chatStore';
import {ChatHistory} from '@/components/ui/sidebar/ChatHistory';

export default function SidebarContent() {
    return (
        <div className="p-4">
          <ChatHistory/>    
        </div>
    );
}
