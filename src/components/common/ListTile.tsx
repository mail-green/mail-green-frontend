import React from "react";

interface ListTileProps {
    children: React.ReactNode;
    onClick?: () => void;
}

export function ListTile({ children, onClick }: ListTileProps) {
    return (
        <button
            type="button"
            className="w-full flex items-center justify-between bg-[#f6f9fe] rounded-2xl px-6 py-4 focus:outline-none transition-colors hover:bg-[#eaf1fd]"
            onClick={onClick}
        >
            <span className="font-bold text-lg text-black">{children}</span>
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24" className="ml-2">
                <path d="M9 6l6 6-6 6" stroke="#A7CBFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </button>
    );
} 