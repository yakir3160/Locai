
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"

interface ControlPanelProps {
    modelCount: "1" | "2"
    setModelCount: (value: "1" | "2") => void
    factCheck: boolean
    setFactCheck: (value: boolean) => void
}

export function ControlPanel({
                                 modelCount,
                                 setModelCount,
                                 factCheck,
                                 setFactCheck,
                             }: ControlPanelProps) {
    return (
        <div className="flex flex-row text-nowrap justify-center items-center md:justify-between mt-4 space-y-2 md:space-y-0 text-sm">
            <div className={`flex flex-col items-center`}>
                <RadioGroup
                    value={modelCount}
                    onValueChange={(value) => setModelCount(value as "1" | "2")}
                    className="flex flex-row justify-center items-center space-x-1 p-2 rounded-full"
                >
                    <div className="flex items-center space-x-1">
                        <RadioGroupItem value="1" id="r1" />
                        <Label htmlFor="r1" className="">
                            1 Model
                        </Label>
                    </div>
                    <div className="flex items-center space-x-1">
                        <RadioGroupItem value="2" id="r2" className={` border border-pink-500`} />
                        <Label htmlFor="r2" className=" bg-gradient-ai text-transparent bg-clip-text">
                            2 Models
                        </Label>
                    </div>
                </RadioGroup>
            </div>
            <div className={`flex flex-col items-center space-x-2`}>

                <div className="flex items-center space-x-2 border border-orange-500/30 p-2 rounded-full">
                    <Checkbox id="fact-check" checked={factCheck} onCheckedChange={setFactCheck} />
                    <Label htmlFor="fact-check" className="">
                        Fact Check
                    </Label>
                </div>
            </div>
        </div>
    )
}

