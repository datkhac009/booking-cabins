import { useState } from "react";
import styled from "styled-components";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import useLogin from "./useLogin";
import SpinnerMini from "../../ui/SpinnerMini";

const StyledLoginForm = styled(Form)`
  width: 100%;
  padding: 0;
  border: none;
  box-shadow: none;
  background: transparent;
  overflow: visible;
`;

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { logins, isLogin } = useLogin();
  function handleSubmit(e) {
    e.preventDefault();

    if (!email || !password) return;
    logins(
      { email, password },
      {
        onSettled: () => {
          setEmail("");
          setPassword("");
        },
      }
    );
  }

  return (
    <StyledLoginForm onSubmit={handleSubmit}>
      <FormRow label="Email address" orientation="vertical">
        <Input
          type="email"
          id="email"
          // This makes this form better for password managers
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLogin}
        />
      </FormRow>
      <FormRow label="Password" orientation="vertical">
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLogin}
        />
      </FormRow>
      <FormRow orientation="vertical">
        <Button size="large" disabled={isLogin}>
          {!isLogin ? "Log in" : <SpinnerMini />}
        </Button>
      </FormRow>
    </StyledLoginForm>
  );
}

export default LoginForm;
