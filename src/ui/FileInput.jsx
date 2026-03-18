import { useState } from "react";
import styled from "styled-components";

const FileInputWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  width: 100%;
`;

const HiddenFileInput = styled.input`
  display: none;
`;

const FileLabel = styled.label`
  display: inline-block;
  padding: 1.2rem 1.6rem;
  border-radius: 8px;
  background-color: var(--color-brand-600);
  color: var(--color-brand-50);
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    background-color: var(--color-brand-700);
  }
`;

const FileNameBox = styled.div`
  flex: 1;
  min-height: 4.8rem;
  display: flex;
  align-items: center;
  padding: 0 1.2rem;
  border: 1px solid var(--color-grey-300);
  border-radius: 8px;
  background-color: var(--color-grey-0);
  color: var(--color-grey-500);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

function FileInput({ onChange }) {
  const [fileName, setFileName] = useState("Chưa có tệp nào được chọn");

  function handleChange(e) {
    const file = e.target.files[0];
    setFileName(file ? file.name : "Chưa có tệp nào được chọn");
    onChange?.(e);
  }

  return (
    <FileInputWrapper>
      <HiddenFileInput
        id="avatar"
        type="file"
        accept="image/*"
        onChange={handleChange}
      />
      <FileLabel htmlFor="avatar">Choose file</FileLabel>
      <FileNameBox>{fileName}</FileNameBox>
    </FileInputWrapper>
  );
}

export default FileInput;