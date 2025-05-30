import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function parseQuery(search: string) {
    const params = new URLSearchParams(search);
    return {
        id: params.get("id"),
        name: params.get("name"),
        email: params.get("email"),
    };
}

export default function LoginSuccessPage() {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const user = parseQuery(location.search);
        if (user.id && user.name && user.email) {
            localStorage.setItem("user", JSON.stringify(user));
            navigate("/home", { replace: true });
        } else {
            alert("로그인 정보가 올바르지 않습니다.");
            navigate("/login", { replace: true });
        }
    }, [location.search, navigate]);

    return <div>로그인 처리 중...</div>;
} 