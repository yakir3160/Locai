import ModelDropdown from "@/components/ui/custom/ModelDropdown";
import * as React from "react";
import {useChatStore} from "@/src/store/chatStore";

export const  ModelSelect = () => {
  const {multiModel} = useChatStore()
    return (
        <div className="flex items-center space-x-2 b p-2 text-xs md:text-base">
          <div className="flex flex-row items-center px-2 md:text-nowrap  border border-pink-500/20 rounded-full  ">
            {
                multiModel && (
                    <span  className={`text-foreground opacity-60`}>Main</span>
                )
            }
            <ModelDropdown/>
          </div>

            {
                multiModel && (
                    <div className="flex flex-row items-center px-2  md:text-nowrap  border border-pink-500/20 rounded-full   ">
                      <span className={`text-foreground opacity-60`}>2end</span>
                      <ModelDropdown/>
                    </div>
                )}

</div>
)
  ;
}