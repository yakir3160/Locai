'use client';
import React, { useState } from 'react';
import { ArrowUp  } from "lucide-react";
import type { Message } from '@/src/types';
import {Input} from '@/src/components/Input';

export const ChatInterface: React.FC = () => {

    return (
        <div className={``}>
            <div className='rounded-3xl bg-pink-500/[2%]   h-[800px]'>
                <span className='text-3xl text-white'>Chat Interface</span>

            </div>
            <Input />
        </div>
    );
};

