import { useEffect } from 'react';
import GlobalContainer from '../container/GlobalContainer';
import LoginButton from '../components/login/LoginButton';
import LoginTitle from '../components/login/LoginTitle';
import LoginContainer from '../container/LoginContainer';

function Login() {

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



    return (
        <GlobalContainer>
            <LoginContainer>
                <LoginTitle />
                <LoginButton text="구글로 로그인" />
            </LoginContainer>
        </GlobalContainer>
    );
}

export default Login;
