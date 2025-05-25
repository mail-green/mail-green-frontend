export function AnalyzingStatusCard() {
    // TODO: 글로벌 스테이트로 분리 예정
    const userName = "준혁";
    const carbonAmount = 3.2;
    const progress = 10;

    return (
        <div className="flex items-center bg-main-light rounded-2xl px-6 py-4 w-full">
            <div className="flex-1">
                <div className="font-bold text-lg mb-1">
                    {userName}님의 메일을 분석중입니다...
                </div>
                <div className="text-gray-600 text-base">
                    박{userName}님의 예상 탄소 절감량 : <span className="font-medium">{carbonAmount}g CO₂</span>
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
                        style={{ transition: "stroke-dashoffset 0.5s" }}
                    />
                </svg>
                <span className="absolute text-main font-bold text-lg">{progress}</span>
            </div>
        </div>
    );
}