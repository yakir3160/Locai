
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import {useChatStore} from "@/src/store/chatStore";


export const  ControlPanel = () =>  {
    const { multiModel, setMultiModel, factCheck, setFactCheck } = useChatStore();
    return (
        <div className="flex flex-row text-nowrap justify-center items-center md:justify-between mt-2 p-2 space-y-2 md:space-y-0 text-sm">
            <div className={`flex flex-row items-center`}>
                <div className="flex items-center space-x-2  p-2 rounded-full">
                    <Checkbox id={"multi-model"} checked={multiModel} onCheckedChange={setMultiModel} className={`border border-pink-500/50 data-[state=checked]:bg-pink-500`}/>
                    <Label htmlFor="multi-model" className=" bg-gradient-ai text-transparent bg-clip-text">
                        Multi-Model
                    </Label>
                </div>
                    <div className="flex items-center space-x-2 border border-orange-500/30 p-2 rounded-full">
                        <Checkbox id="fact-check" checked={factCheck} onCheckedChange={setFactCheck} className={`border border-orange-500/50 data-[state=checked]:bg-orange-500`}/>
                        <Label htmlFor="fact-check" className="">
                            Fact Check
                        </Label>
                    </div>
                </div>

            </div>
            )
            }

