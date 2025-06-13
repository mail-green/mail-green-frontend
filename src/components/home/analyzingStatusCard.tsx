
import useUser from "../../hooks/useUser";

type AnalyzingStatusCardProps = {
    isComplete: boolean;
    showCheck?: boolean;
}

export function AnalyzingStatusCard({ isComplete, showCheck = false }: AnalyzingStatusCardProps) {

    const userName = useUser()?.name ?? '';

    return (
        <div className="flex items-center bg-main-light rounded-2xl px-6 py-4 w-full">
            <div className="flex-1">
                <div className="font-bold text-lg mb-1">
                    {isComplete ? `${userName}님의 메일 분석이 완료되었습니다!` : `${userName}님의 메일을 분석중입니다`}
                </div>
                <div className="font-normal text-sm text-text mb-1">
                    {isComplete ? "이제 다양한 기능을 사용해보세요!" : "분석이 끝날 때까지 잠시 기다려주세요"}
                </div>
            </div>

            <div className="ml-4 relative w-12 h-12 flex items-center justify-center">
                {isComplete !== undefined && (
                    <span
                        className={`absolute text-main font-bold text-lg transition-all duration-300 ${showCheck ? 'scale-50 opacity-0' : 'scale-100 opacity-100'}`}
                        style={{ zIndex: 3 }}
                    >
                        {isComplete ? '완료' : '분석중'}
                    </span>
                )}
            </div>
        </div>
    );
}