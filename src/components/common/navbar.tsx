import React from 'react'
import profile from '../../assets/nav/profile_example.png';
import { motion, AnimatePresence } from 'framer-motion';
import BackIcon from './BackIcon';
import TitleText from './TitleText';
import { useUserStore } from '../../store/userStore';
import { useNavigate } from 'react-router-dom';
import useUser from '../../hooks/useUser';

function LogoutIcon({ size = 24 }: { size?: number }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
        </svg>
    );
}

export type NavbarMode = 'home' | 'recommend';

interface NavbarProps {
    mode: NavbarMode;
    onBack?: () => void;
    title?: string;
}

function HomeNavbar() {
    const user = useUser();
    const clearUser = useUserStore((state) => state.clearUser);
    const navigate = useNavigate();
    const handleLogout = () => {
        clearUser();
        navigate('/');
    };
    return (
        <div className='flex flex-row items-center justify-between w-full px-6'>
            <TitleText text={`안녕하세요, ${user.name}님!`} />
            <div className='flex flex-row items-center gap-2'>
                <button>
                    <img src={profile} alt="프로필 이미지" />
                </button>
                <button onClick={handleLogout} title="로그아웃" className="ml-2">
                    <LogoutIcon size={24} />
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