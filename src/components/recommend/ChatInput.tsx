import React, { useState } from 'react';

interface Props {
    value: string;
    onChange: (v: string) => void;
    onSend: () => void;
    disabled?: boolean;
}

export default function ChatInput({ value, onChange, onSend, disabled }: Props) {
    const [input, setInput] = useState(value);

    React.useEffect(() => {
        setInput(value);
    }, [value]);

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
        onChange(e.target.value);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && !disabled && input.trim()) {
            onSend();
        }
    };

    return (
        <div style={{ display: 'flex', gap: 8, padding: '8px 0' }}>
            <input
                type='text'
                value={input}
                onChange={handleInput}
                onKeyDown={handleKeyDown}
                disabled={disabled}
                placeholder='질문을 입력하세요...'
                style={{ flex: 1, borderRadius: 8, border: '1px solid #ccc', padding: '8px' }}
            />
            <button
                onClick={onSend}
                disabled={disabled || !input.trim()}
                style={{ borderRadius: 8, padding: '8px 16px', background: '#8fd694', color: '#fff', border: 'none' }}
            >
                전송
            </button>
        </div>
    );
} 