import React from 'react'

const useUser = () => {
    const userStr = localStorage.getItem('user');
    if (!userStr) {
        return null;
    }
    return JSON.parse(userStr);
}

export default useUser