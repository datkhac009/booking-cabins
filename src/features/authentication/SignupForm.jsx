import { useForm } from "react-hook-form";
import styled, { css } from "styled-components";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import SpinnerMini from "../../ui/SpinnerMini";
import useSignUpForm from "./useSignUpForm";

const StyledSignupForm = styled(Form)`
  ${(props) =>
    props.$flat &&
    css`
      width: 100%;
      padding: 0;
      border: none;
      box-shadow: none;
      background: transparent;
      overflow: visible;
    `}
`;

const FormActions = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.2rem;
  width: 100%;

  @media (max-width: 520px) {
    grid-template-columns: 1fr;
  }
`;

function SignupForm({ flat = false }) {
  const { register, formState, getValues, handleSubmit, reset } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      passwordConfirm: "",
    },
  });
  const { errors } = formState;
  const { signup, isLoading } = useSignUpForm();

  function onSubmit({ fullName, email, password }) {
    signup(
      { fullName: fullName.trim(), email: email.trim(), password },
      { onSuccess: () => reset() }
    );
  }

  return (
    <StyledSignupForm $flat={flat} onSubmit={handleSubmit(onSubmit)}>
      <FormRow
        label="Full name"
        error={errors?.fullName?.message}
        orientation="vertical"
      >
        <Input
          type="text"
          id="fullName"
          autoComplete="name"
          disabled={isLoading}
          {...register("fullName", {
            required: "Please enter your full name",
            minLength: {
              value: 2,
              message: "Full name needs at least 2 characters",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Email address"
        error={errors?.email?.message}
        orientation="vertical"
      >
        <Input
          type="email"
          id="email"
          autoComplete="email"
          disabled={isLoading}
          {...register("email", {
            required: "Please enter your email address",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please provide a valid email address",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Password (min 8 characters)"
        error={errors?.password?.message}
        orientation="vertical"
      >
        <Input
          type="password"
          id="password"
          autoComplete="new-password"
          disabled={isLoading}
          {...register("password", {
            required: "Please enter a password",
            minLength: {
              value: 8,
              message: "Password needs at least 8 characters",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Repeat password"
        error={errors?.passwordConfirm?.message}
        orientation="vertical"
      >
        <Input
          type="password"
          id="passwordConfirm"
          autoComplete="new-password"
          disabled={isLoading}
          {...register("passwordConfirm", {
            required: "Please confirm your password",
            validate: (value) =>
              value === getValues("password") || "Passwords need to match",
          })}
        />
      </FormRow>

      <FormRow orientation="vertical">
        <FormActions>
          <Button disabled={isLoading}>
            {!isLoading ? "Create account" : <SpinnerMini />}
          </Button>
        </FormActions>
      </FormRow>
    </StyledSignupForm>
  );
}

export default SignupForm;
