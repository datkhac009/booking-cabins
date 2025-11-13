import styled, { css } from "styled-components";

const Form = styled.form`
  ${(props) =>
    props.type !== "modal" &&
    css`
      padding: 2.4rem 4rem;
      background-color: var(--color-grey-0);
      border: 1px solid var(--color-grey-100);
      border-radius: var(--border-radius-md);
      box-shadow: var(--shadow-sm);
      max-width: 96rem;
      margin-inline: auto;
    `}

  ${(props) =>
    props.type === "modal" &&
    css`
      width: 50%;
      max-width: 96rem; /* đồng bộ với table/container */
    `}

  overflow: hidden;
  font-size: 1.4rem;
`;
export default Form;
