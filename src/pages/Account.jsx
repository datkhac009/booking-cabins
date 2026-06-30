import { useState } from "react";
import styled from "styled-components";
import Button from "../ui/Button";
import FileInput from "../ui/FileInput";
import Heading from "../ui/Heading";
import Input from "../ui/Input";
import PasswordInput from "../ui/PasswordInput";
import SpinnerMini from "../ui/SpinnerMini";
import { useUser } from "../features/authentication/useUser";
import useUpdateUser from "../features/authentication/useUpdateUser";

const AccountPanel = styled.form`
  margin-top: 2.4rem;
  overflow: hidden;
  border: 1px solid var(--color-grey-200);
  border-radius: var(--border-radius-md);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
`;

const PanelHeader = styled.div`
  display: grid;
  gap: 0.4rem;
  padding: 2.4rem 3.2rem;
  border-bottom: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-50);
`;

const Description = styled.p`
  color: var(--color-grey-500);
  font-size: 1.4rem;
`;

const AccountTable = styled.div`
  display: grid;
`;

const AccountRow = styled.div`
  display: grid;
  grid-template-columns: 22rem minmax(0, 1fr);
  gap: 2.4rem;
  align-items: center;
  padding: 1.8rem 3.2rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
    gap: 0.8rem;
  }
`;

const LabelGroup = styled.div`
  display: grid;
  gap: 0.2rem;
`;

const Label = styled.label`
  font-weight: 600;
  color: var(--color-grey-700);
`;

const Hint = styled.span`
  color: var(--color-grey-500);
  font-size: 1.3rem;
`;

const Error = styled.span`
  display: block;
  margin-top: 0.6rem;
  color: var(--color-red-700);
  font-size: 1.3rem;
`;

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1.2rem;
  padding: 2.4rem 3.2rem;
  border-top: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-50);

  @media (max-width: 520px) {
    flex-direction: column-reverse;
  }
`;

function Account() {
  const {
    user: {
      email,
      user_metadata: { fullName: currentFullName },
    },
  } = useUser();

  const [fullName, setFullName] = useState(currentFullName || "");
  const [avatar, setAvatar] = useState(null);
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [errors, setErrors] = useState({});
  const { updateUser, isUpdateting } = useUpdateUser();

  function validate() {
    const nextErrors = {};
    const trimmedFullName = fullName.trim();
    const wantsPasswordUpdate = password || passwordConfirm;

    if (!trimmedFullName)
      nextErrors.fullName = "Please enter your full name";

    if (wantsPasswordUpdate && password.length < 8)
      nextErrors.password = "Password needs at least 8 characters";

    if (wantsPasswordUpdate && password !== passwordConfirm)
      nextErrors.passwordConfirm = "Passwords need to match";

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;

    const payload = {
      fullName: fullName.trim(),
      avatar,
    };

    if (password) payload.password = password;

    updateUser(payload, {
      onSuccess: () => {
        setAvatar(null);
        setPassword("");
        setPasswordConfirm("");
        setErrors({});
        e.target.reset();
      },
    });
  }

  return (
    <>
      <Heading as="h1">Update your account</Heading>

      <AccountPanel onSubmit={handleSubmit}>
        <PanelHeader>
          <Heading as="h2">Account settings</Heading>
          <Description>
            Manage your profile details and password in one place.
          </Description>
        </PanelHeader>

        <AccountTable>
          <AccountRow>
            <LabelGroup>
              <Label htmlFor="email">Email address</Label>
              <Hint>Used for logging in</Hint>
            </LabelGroup>
            <Input id="email" value={email} disabled />
          </AccountRow>

          <AccountRow>
            <LabelGroup>
              <Label htmlFor="fullName">Full name</Label>
              <Hint>This name is shown in the app header</Hint>
            </LabelGroup>
            <div>
              <Input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                disabled={isUpdateting}
              />
              {errors.fullName && <Error>{errors.fullName}</Error>}
            </div>
          </AccountRow>

          <AccountRow>
            <LabelGroup>
              <Label htmlFor="avatar">Avatar image</Label>
              <Hint>Optional profile photo</Hint>
            </LabelGroup>
            <FileInput
              id="avatar"
              disabled={isUpdateting}
              accept="image/*"
              onChange={(e) => setAvatar(e.target.files[0])}
            />
          </AccountRow>

          <AccountRow>
            <LabelGroup>
              <Label htmlFor="password">New password</Label>
              <Hint>Leave blank to keep the current password</Hint>
            </LabelGroup>
            <div>
              <PasswordInput
                id="password"
                autoComplete="new-password"
                disabled={isUpdateting}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && <Error>{errors.password}</Error>}
            </div>
          </AccountRow>

          <AccountRow>
            <LabelGroup>
              <Label htmlFor="passwordConfirm">Confirm password</Label>
              <Hint>Must match the new password</Hint>
            </LabelGroup>
            <div>
              <PasswordInput
                id="passwordConfirm"
                autoComplete="new-password"
                disabled={isUpdateting}
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
              />
              {errors.passwordConfirm && (
                <Error>{errors.passwordConfirm}</Error>
              )}
            </div>
          </AccountRow>
        </AccountTable>

        <Actions>
          <Button disabled={isUpdateting}>
            {!isUpdateting ? "Update account" : <SpinnerMini />}
          </Button>
        </Actions>
      </AccountPanel>
    </>
  );
}

export default Account;
