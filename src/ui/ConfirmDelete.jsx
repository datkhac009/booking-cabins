import styled from "styled-components";
import Button from "./Button";
import Heading from "./Heading";
import SpinnerMini from "./SpinnerMini";

const StyledConfirmDelete = styled.div`
  width: 40rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  padding: 2rem;

  & p {
    color: var(--color-grey-500);
    margin-bottom: 1rem;
    line-height: 1.5;
    font-size: 1.4rem;
  }

  & div {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

function ConfirmDelete({ resource, onClick, disabled, closeModal }) {
  function handleConfirmClick() {
    onClick();
  }

  return (
    <StyledConfirmDelete>
      <Heading as="h3">Delete {resource}</Heading>
      <p>
        Are you sure you want to delete this {resource} permanently? This action
        cannot be undone.
      </p>

      <div>
        <Button variation="secondary" onClick={closeModal} disabled={disabled}>
          Cancel
        </Button>
        <Button
          variation="danger"
          onClick={handleConfirmClick}
          disabled={disabled}
        >
          {disabled ? <SpinnerMini /> : "Delete"}
        </Button>
      </div>
    </StyledConfirmDelete>
  );
}

export default ConfirmDelete;
