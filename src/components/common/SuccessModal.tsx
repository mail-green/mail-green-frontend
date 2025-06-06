import React from 'react';
import BottomSheet from './BottomSheet';
import LeafIcon from './LeafIcon';

interface SuccessModalProps {
    open: boolean;
    onClose: () => void;
    userName: string;
    carbonSaved: number;
}

const SuccessModal = ({ open, onClose, userName, carbonSaved }: SuccessModalProps) => {
    return (
        <BottomSheet open={open} onClose={onClose}>
            <div className="flex flex-col items-center text-center">
                <div className="bg-green-50 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                    <LeafIcon className="w-8 h-8 text-main" />
                </div>
                <div className="font-bold text-lg mb-2">성공적으로 삭제되었습니다</div>
                <div className="text-sm mb-6">
                    <span className="font-semibold">{userName}</span>님의 예상 탄소 절감량 :
                    <span className="text-main font-bold ml-1">{carbonSaved}g CO₂</span>
                </div>

                <button
                    className="w-full py-3 rounded-lg bg-main text-white font-bold text-base hover:bg-main transition"
                    onClick={onClose}
                >
                    닫기
                </button>
            </div>
        </BottomSheet>
    );
};

export default SuccessModal; 