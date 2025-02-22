import React from 'react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { useChatStore } from "@/src/store/chatStore";


const ModelDropdown: React.FC = () => {
  const { models } = useChatStore();
  const [selectedModel, setSelectedModel] = React.useState(models[0]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="w-fit flex items-center rounded-3xl outline-none border-none shadow-none">
          {selectedModel.displayName}
          <ChevronDown className="ml-2 h-4 w-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[200px] bg-background shadow-[0_1px_10px_rgba(255,105,180,0.5)]">
        <DropdownMenuLabel>AI Models</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={selectedModel.name}
          onValueChange={(value) => setSelectedModel(models.find((model) => model.name === value) || models[0])}
        >
          {models.map((model) => (
            <DropdownMenuRadioItem key={model.name} value={model.name}>
              {model.displayName} 
              <span className="text-xs text-gray-400"> {model.company}</span>
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ModelDropdown;