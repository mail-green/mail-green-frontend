import { useMemo } from 'react';

const useUser = () => {
    const userStr = localStorage.getItem('user');
    return useMemo(() => {
        if (!userStr) return null;
        return JSON.parse(userStr);
    }, [userStr]);
}

export default useUser