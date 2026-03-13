import styled from "styled-components";
import { useUser } from "../features/authentication/useUser";
import Spinner from "../ui/Spinner";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  //step1. lấy thông tin người dùng đăng nhập
  const { user, isLoading, isAuthenticated  } = useUser();
  console.log(user);
  
  //step2. xác thực nếu không có người dùng nào đăng nhập đúng sẽ chuyển hướng về trang login
  
  useEffect(() => {
    if (!isAuthenticated && !isLoading) navigate("/login");
}, [isAuthenticated,isLoading,navigate]);

//step3. hiển thị loading
  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );
  //step4. Nếu có ng dùng đăng nhập chính xác thì sẽ chuyển hướng về trang Dashboard

  if(isAuthenticated) return children;
}

export default ProtectedRoute;
