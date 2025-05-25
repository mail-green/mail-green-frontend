import React from "react";

export type FeatureCardData = {
    bgColor: string; // tailwind 색상 클래스 또는 hex
    textColor: string;
    title: string;
    description: string;
    highlight?: string; // 강조 텍스트 (optional)
    buttonText: string;
    onClick?: () => void;
};

export function FeatureCard({ data }: { data: FeatureCardData }) {
    return (
        <div
            className={`rounded-2xl px-6 py-6 w-full mb-6 relative flex flex-col min-h-[160px] transition-transform duration-200 hover:scale-[1.03] active:scale-95 hover:shadow-lg cursor-pointer hover:opacity-90 active:opacity-80`}
            style={{ backgroundColor: data.bgColor }}
        >
            <div className="font-bold text-lg mb-1" style={{ color: data.textColor }}>
                {data.title}
            </div>
            <div className="font-bold text-xl mb-6 whitespace-pre-line" style={{ color: data.textColor }}>
                {data.description}
                {data.highlight && (
                    <span className="block font-bold text-2xl mt-1">{data.highlight}</span>
                )}
            </div>
            <button
                className="w-full flex items-center justify-between font-bold text-base mt-auto bg-transparent p-0 border-none outline-none cursor-pointer"
                onClick={data.onClick}
                style={{ background: "none", color: data.textColor }}
            >
                <span>{data.buttonText}</span>
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24" className="ml-2">
                    <path d="M9 6l6 6-6 6" stroke={data.textColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>
        </div>
    );
} 