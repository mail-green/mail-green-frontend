import React, { useEffect, useState } from "react";

export function AnalyzingStatusCard() {
    // TODO: 글로벌 스테이트로 분리 예정
    const userName = "준혁";
    const targetProgress = 90;
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // 마운트 시 한 번만 목표값으로 변경
        setTimeout(() => setProgress(targetProgress), 100);
    }, [targetProgress]);

    return (
        <div className="flex items-center bg-main-light rounded-2xl px-6 py-4 w-full">
            <div className="flex-1">
                <div className="font-bold text-lg mb-1">
                    {userName}님의 메일을 분석중입니다
                </div>
                <div className="font-normal text-lg text-text mb-1">
                    분석이 끝날 때까지 잠시 기다려주세요
                </div>
            </div>
            {/* 원형 게이지 */}
            <div className="ml-4 relative w-12 h-12 flex items-center justify-center">
                <svg className="absolute top-0 left-0" width="48" height="48">
                    <circle
                        cx="24"
                        cy="24"
                        r="20"
                        fill="none"
                        stroke="#D1FADF"
                        strokeWidth="6"
                    />
                    <circle
                        cx="24"
                        cy="24"
                        r="20"
                        fill="none"
                        stroke="#8FD694"
                        strokeWidth="6"
                        strokeDasharray={2 * Math.PI * 20}
                        strokeDashoffset={2 * Math.PI * 20 * (1 - progress / 100)}
                        strokeLinecap="round"
                        style={{ transition: "stroke-dashoffset 1s" }}
                        transform="rotate(-90 24 24)"
                    />
                </svg>
                <span className="absolute text-main font-bold text-lg">{progress}</span>
            </div>
        </div>
    );
}