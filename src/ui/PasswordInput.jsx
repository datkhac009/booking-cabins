import { useState, forwardRef } from 'react';
import styled from "styled-components";
import { HiEye, HiEyeSlash } from "react-icons/hi2";
import Input from "./Input";

const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const ToggleBtn = styled.button`
  position: absolute;
  right: 1rem;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.8rem;
  color: var(--color-grey-500);
  display: flex;
  align-items: center;
  padding: 0;

  &:hover {
    color: var(--color-grey-700);
  }
`;

const PasswordInput = forwardRef(function PasswordInput({ disabled, ...rest }, ref) {
  const [show, setShow] = useState(false);

  return (
    <Wrapper>
      <Input
        type={show ? 'text' : 'password'}
        disabled={disabled}
        ref={ref}
        {...rest}
      />
      <ToggleBtn type='button' onClick={() => setShow((s) => !s)}>
        {show ? <HiEyeSlash /> : <HiEye />}
      </ToggleBtn>
    </Wrapper>
  );
}); // ← dấu ); này đóng forwardRef

export default PasswordInput;
