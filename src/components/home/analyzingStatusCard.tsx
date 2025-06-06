import React from "react";

export function AnalyzingStatusCard({ progress, isComplete, showCheck = false }: { progress: number | undefined, isComplete: boolean, showCheck?: boolean }) {
    const userName = "준혁";

    return (
        <div className="flex items-center bg-main-light rounded-2xl px-6 py-4 w-full">
            <div className="flex-1">
                <div className="font-bold text-lg mb-1">
                    {isComplete ? `${userName}님의 메일 분석이 완료되었습니다!` : `${userName}님의 메일을 분석중입니다`}
                </div>
                <div className="font-normal text-lg text-text mb-1">
                    {isComplete ? "이제 다양한 기능을 사용해보세요!" : "분석이 끝날 때까지 잠시 기다려주세요"}
                </div>
            </div>
            {/* 원형 게이지는 항상 고정 */}
            <div className="ml-4 relative w-12 h-12 flex items-center justify-center">
                <svg className="absolute top-0 left-0" width="48" height="48" style={{ zIndex: 1 }}>
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
                        strokeDashoffset={2 * Math.PI * 20 * (1 - (progress ?? 1) / 100)}
                        strokeLinecap="round"
                        style={{ transition: "stroke-dashoffset 1s" }}
                        transform="rotate(-90 24 24)"
                    />
                </svg>
                {/* 숫자와 체크가 중앙에서 교차 애니메이션 */}
                {progress !== undefined && (
                    <span
                        className={`absolute text-main font-bold text-lg transition-all duration-300 ${showCheck ? 'scale-50 opacity-0' : 'scale-100 opacity-100'}`}
                        style={{ zIndex: 3 }}
                    >
                        {progress ?? ''}
                    </span>
                )}
                <svg
                    className={`absolute top-1/2 left-1/2 transition-all duration-500 ${showCheck ? 'opacity-100 scale-100 -translate-x-1/2 -translate-y-1/2' : 'opacity-0 scale-50 -translate-x-1/2 -translate-y-1/2'}`}
                    width="32" height="32"
                    style={{ zIndex: 4 }}
                >
                    <circle
                        cx="16"
                        cy="16"
                        r="14"
                        fill="none"
                        stroke="none"
                        strokeWidth="0"
                    />
                    <polyline
                        points="10,17 15,22 23,12"
                        fill="none"
                        stroke="#8FD694"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{
                            strokeDasharray: 24,
                            strokeDashoffset: 0,
                            transition: 'stroke-dashoffset 0.5s',
                        }}
                    />
                </svg>
            </div>
        </div>
    );
}