import React from 'react'
import profile from '../../assets/nav/profile_example.png';
import { motion, AnimatePresence } from 'framer-motion';
import BackIcon from './BackIcon';
import TitleText from './TitleText';

export type NavbarMode = 'home' | 'sort';

interface NavbarProps {
    mode: NavbarMode;
    onBack?: () => void;
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

function SortNavbar({ onBack }: { onBack?: () => void }) {
    return (
        <div className='flex flex-row items-center w-full px-4 py-2' onClick={onBack}>
            <button className='mr-2'>
                <BackIcon />
            </button>
            <h1 className='text-2xl font-bold'>발신자별로 정리하기</h1>
        </div>
    );
}

export function Navbar({ mode, onBack }: NavbarProps) {
    switch (mode) {
        case 'sort':
            return <SortNavbar onBack={onBack} />;
        case 'home':
            return <HomeNavbar />
        default:
            return <HomeNavbar />;
    }
}

export function NavbarContainer({ mode, onBack }: NavbarProps) {
    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={mode}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.25 }}
            >
                <Navbar mode={mode} onBack={onBack} />
            </motion.div>
        </AnimatePresence>
    );
}