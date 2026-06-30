import { Link } from "react-router-dom";
import styled from "styled-components";
import SignupForm from "../features/authentication/SignupForm";
import Heading from "../ui/Heading";
import Logo from "../ui/Logo";

const SignupLayout = styled.main`
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 3.2rem 2rem;
  background:
    linear-gradient(135deg, rgba(79, 70, 229, 0.08), transparent 34rem),
    radial-gradient(circle at top right, rgba(21, 128, 61, 0.1), transparent 32rem),
    var(--color-grey-50);
`;

const SignupCard = styled.section`
  width: min(100%, 48rem);
  display: grid;
  gap: 2.4rem;
  padding: 3.2rem;
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-lg);

  @media (max-width: 520px) {
    padding: 2.4rem;
  }
`;

const Header = styled.div`
  display: grid;
  gap: 1.2rem;
  text-align: center;
`;

const SubText = styled.p`
  color: var(--color-grey-500);
  font-size: 1.4rem;
`;

const FooterText = styled.p`
  text-align: center;
  color: var(--color-grey-600);
  font-size: 1.4rem;

  a {
    color: var(--color-brand-600);
    font-weight: 600;
  }

  a:hover {
    color: var(--color-brand-700);
  }
`;

function Signup() {
  return (
    <SignupLayout>
      <SignupCard>
        <Logo />
        <Header>
          <Heading as="h1" type="h3">
            Create your account
          </Heading>
          <SubText>Register a new Wild Oasis user with Supabase Auth.</SubText>
        </Header>
        <SignupForm flat />
        <FooterText>
          Already have an account? <Link to="/login">Log in</Link>
        </FooterText>
      </SignupCard>
    </SignupLayout>
  );
}

export default Signup;
