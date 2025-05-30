import React from 'react';

interface BaseMailCardLayoutProps {
    title: React.ReactNode;
    subtitle: React.ReactNode;
    count: number;
    children?: React.ReactNode;
}

export function BaseMailCardLayout({ title, subtitle, count, children }: BaseMailCardLayoutProps) {
    return (
        <div className="rounded-xl border border-gray-200 p-4 mb-4 flex flex-col gap-2 bg-white">
            <div className="flex items-center justify-between">
                <div>
                    <div className="text-xl font-bold" style={{ color: 'var(--color-main)' }}>{title}</div>
                    <div className="text-gray-400">{subtitle}</div>
                </div>
                <div
                    className="rounded-full px-3 py-1 text-sm font-bold"
                    style={{ background: 'var(--color-main-light)', color: 'var(--color-main)' }}
                >
                    {count}
                </div>
            </div>
            <div className="flex justify-end">
                {children}
            </div>
        </div>
    );
} 