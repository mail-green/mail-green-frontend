import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface BottomSheetProps {
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const BottomSheet = ({ open, onClose, children }: BottomSheetProps) => {
    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-end justify-center bg-black/30"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                >
                    <motion.div
                        className="bg-white w-full max-w-md rounded-t-2xl p-6 pb-10 shadow-xl"
                        initial={{ y: '100%' }}
                        animate={{ y: 0 }}
                        exit={{ y: '100%' }}
                        transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                        onClick={e => e.stopPropagation()}
                    >
                        {children}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default BottomSheet; 