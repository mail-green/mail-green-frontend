import React, { useState, useEffect } from 'react'
import profile from '../../assets/nav/profile_example.png';
import { motion, AnimatePresence } from 'framer-motion';
import BackIcon from './BackIcon';
import TitleText from './TitleText';

export type NavbarMode = 'home' | 'recommend';

interface NavbarProps {
    mode: NavbarMode;
    onBack?: () => void;
    title?: string;
}

function HomeNavbar() {
    const user = { name: '준혁' };
    return (
        <div className='flex flex-row items-center justify-between w-full px-6'>
            <TitleText text={`안녕하세요, ${user.name}님`} />
            <div>
                <button>
                    <img src={profile} alt="프로필 이미지" />
                </button>
            </div>
        </div>
    );
}

function SortNavbar({ onBack, title }: { onBack?: () => void; title: string; }) {
    return (
        <div className='flex flex-row items-center w-full px-4 py-2' onClick={onBack}>
            <button className='mr-2'>
                <BackIcon />
            </button>
            <h1 className='text-2xl font-bold'>{title}</h1>
        </div>
    );
}

export function Navbar({ mode, onBack, title }: NavbarProps) {
    switch (mode) {
        case 'recommend':
            return <SortNavbar onBack={onBack} title={title || ''} />;
        case 'home':
            return <HomeNavbar />
        default:
            return <HomeNavbar />;
    }
}

export function NavbarContainer({ mode, onBack, title = '' }: NavbarProps) {
    return (
        <AnimatePresence mode="wait" initial={false}>
            <motion.div
                key={mode}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.25 }}
            >
                <Navbar mode={mode} onBack={onBack} title={title} />
            </motion.div>
        </AnimatePresence>
    );
}