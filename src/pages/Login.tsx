import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GlobalContainer from '../container/GlobalContainer';
import LoginButton from '../components/login/LoginButton';
import LoginTitle from '../components/login/LoginTitle';
import LoginContainer from '../container/LoginContainer';

function Login() {
    const navigate = useNavigate();

    useEffect(() => {
        fetch('https://ypv7gw5w9e.execute-api.us-east-1.amazonaws.com/healthcheck', {
            method: 'get',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json()).then(data => {
            console.log(data);
        });
    }, [])

    const handleLogin = () => {
        // mock 로그인 처리 후 홈으로 이동
        navigate('/home');
    }

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
