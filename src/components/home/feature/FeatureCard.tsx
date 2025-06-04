import React from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getFetch } from "../../../utils/fetch/fetch";
import useUser from "../../../hooks/useUser";
import type { CardType } from "../../../data/featureCardData";

export type FeatureCardData = {
    bgColor: string; // tailwind 색상 클래스 또는 hex
    textColor: string;
    title: string;
    description: string;
    highlight?: string; // 강조 텍스트 (optional)
    buttonText: string;
    url?: string;
    type: CardType;
};

type SenderMailCard = {
    sender: string;
    name: string;
    count: number;
};

type KeywordMailCard = {
    topic_id: number;
    description: string;
    count: number;
};

const endpointMap: Record<CardType, string> = {
    sender: '/sender/top',
    keyword: '/keyword/top',
    ai: '/ai/top',
    gpt: '/gpt/top',
};

export function FeatureCard({ data }: { data: FeatureCardData }) {
    const navigate = useNavigate();
    const user = useUser();

    const { data: result, isLoading } = useQuery({
        queryKey: ['top', data.type, user.id],
        queryFn: () => getFetch<SenderMailCard[] | KeywordMailCard[]>(
            endpointMap[data.type],
            { user_id: user.id, limit: 3 }
        ),
        enabled: data.type === "sender" || data.type === "keyword",
    });

    let summary = data.description;

    if (!isLoading && result && result.length > 0) {
        if (data.type === "sender") {
            summary = (result as SenderMailCard[]).map((s) => s.name).join(", ");
        } else if (data.type === "keyword") {
            summary = (result as KeywordMailCard[]).map((k) => k.description).join(", ");
        }
    }

    return (
        <div
            className={`rounded-2xl px-6 py-6 w-full mb-6 relative flex flex-col min-h-[160px] transition-transform duration-200 hover:scale-[1.03] active:scale-95 hover:shadow-lg cursor-pointer hover:opacity-90 active:opacity-80`}
            style={{ backgroundColor: data.bgColor }}
            onClick={() => {
                if (data.url) {
                    navigate(data.url);
                }
            }}
        >
            <div className="font-bold text-lg mb-1" style={{ color: data.textColor }}>
                {data.title}
            </div>
            <div className="font-bold text-xl mb-6 whitespace-pre-line" style={{ color: data.textColor }}>
                {isLoading ? "로딩중..." : summary}
                {data.highlight && (
                    <span className="block font-bold text-2xl mt-1">{data.highlight}</span>
                )}
            </div>
            <button
                className="w-full flex items-center justify-between font-bold text-base mt-auto bg-transparent p-0 border-none outline-none cursor-pointer"
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