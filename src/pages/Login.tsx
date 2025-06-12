import GlobalContainer from '../container/GlobalContainer';
import LoginButton from '../components/login/LoginButton';
import LoginTitle from '../components/login/LoginTitle';
import LoginContainer from '../container/LoginContainer';
import useUser from '../hooks/useUser';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SERVER_BASE_URL = import.meta.env.VITE_REACT_SERVER_BASE_URL;

function Login() {

    const user = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate('/home');
        }
    }, [user]);

    const handleLogin = async () => {
        try {
            const url = `${SERVER_BASE_URL}/auth/google`;

            window.location.href = url;
        } catch {
            alert('로그인 실패');
        }
    };

    return (
        <GlobalContainer>
            <LoginContainer>
                <LoginTitle />
                <LoginButton text="구글로 로그인" onClick={handleLogin} />
            </LoginContainer>
        </GlobalContainer>
    );
}

export default Login;
