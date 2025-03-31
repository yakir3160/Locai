"use client"

import * as React from "react"

import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useChatStore } from "@/src/store/chatStore"
import ModelDropdown from "./custom/ModelDropdown"
import { X } from "lucide-react"
import {RoleSelector} from "@/components/ui/custom/RoleSelector";



export function ControlPanel() {
  const {multiModel, setMultiModel,factCheck, setFactCheck } = useChatStore()
  return (
      <div className="space-y-4 text-xs md:text-base">


        <div
            className="flex flex-col md:flex-row text-nowrap justify-center items-center md:justify-between p-2 space-y-2 md:space-y-0 text-sm">
          <div className="flex flex-row items-center justify-between ">
            <div className="flex items-center space-x-2 p-2 rounded-full">
              <Checkbox
                  id="multi-model"
                  checked={multiModel}
                  onCheckedChange={setMultiModel}
                  className="border border-pink-500/50 data-[state=checked]:bg-pink-500"
              />
              <Label htmlFor="multi-model" className="bg-gradient-ai text-transparent bg-clip-text text-xs md:text-base">
                Multi-Model
              </Label>
            </div>
            <div className="flex items-center space-x-2 border border-orange-500/30 p-2 rounded-full">
              <Checkbox
                  id="fact-check"
                  checked={factCheck}
                  onCheckedChange={setFactCheck}
                  className="border border-orange-500/50 data-[state=checked]:bg-orange-500 "
              />
              <Label htmlFor="fact-check" className={`text-xs md:text-base`}>Fact Check</Label>
            </div>
            {/*<RoleSelector/>*/}
          </div>

        </div>
      </div>
  )
}

