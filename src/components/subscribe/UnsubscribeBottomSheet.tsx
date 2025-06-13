import { useEffect, useState } from 'react';

import LeafIcon from '../common/LeafIcon';
import Loading from '../common/Loading';

interface Props {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    name: string;
    isLoading?: boolean;
}

export default function UnsubscribeBottomSheet({ open, onClose, onConfirm, name, isLoading }: Props) {

    const [visible, setVisible] = useState(open);
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        if (open) {
            setVisible(true);
            setTimeout(() => setAnimate(true), 10);
        } else {
            setAnimate(false);
            const timeout = setTimeout(() => setVisible(false), 250);
            return () => clearTimeout(timeout);
        }
    }, [open]);

    if (!visible) return null;

    return (
        <div
            className={`fixed inset-0 z-50 flex items-end justify-center transition-opacity duration-200 ${animate ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            style={{ background: 'rgba(0,0,0,0.3)' }}
        >
            <div
                className={`
                    bg-white rounded-t-2xl p-6 relative
                    transition-transform duration-250
                    ${animate ? 'translate-y-0' : 'translate-y-full'}
                    min-h-[220px] max-h-[80vh] overflow-y-auto
                `}
                style={{ willChange: 'transform', width: 390, maxWidth: '100%' }}
            >
                {/* 오버레이 로딩 */}
                {isLoading && (
                    <div className="absolute inset-0 bg-white bg-opacity-60 flex items-center justify-center z-10">
                        <Loading />
                    </div>
                )}
                <div className="flex flex-col items-center text-center relative">
                    <div className="bg-green-50 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                        <LeafIcon className="w-8 h-8 text-green-500" />
                    </div>
                    <div className="font-bold text-lg mb-2">정말 구독을 해제하시겠어요?</div>
                    <div className="text-sm mb-6">
                        <span className="font-semibold text-main">{name}</span>의 구독을 해제합니다.<br />
                        구독 해제 시 더 이상 메일을 받지 않게 됩니다.
                    </div>
                    <button
                        className="w-full py-3 rounded-lg bg-main text-white font-bold text-base hover:bg-main-dark transition mb-2"
                        onClick={onConfirm}
                        disabled={isLoading}
                    >
                        {isLoading ? <Loading /> : '구독 해제하기'}
                    </button>
                    <button
                        className="w-full py-3 rounded-lg border border-gray-200 font-semibold text-gray-700 bg-white hover:bg-gray-50 transition"
                        onClick={onClose}
                        disabled={isLoading}
                    >
                        취소
                    </button>
                </div>
            </div>
        </div>
    );
} 