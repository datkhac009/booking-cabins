import React from "react";
import styled from "styled-components";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import { Textarea } from "../../ui/Textarea";
import Spinner from "../../ui/Spinner";
import { useForm } from "react-hook-form";
import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";

const FormHeader = styled.div`
  background: linear-gradient(135deg, var(--color-brand-600) 0%, var(--color-brand-700) 100%);
  color: white;
  padding: 2rem 2.4rem;
  margin: 0;
  border-radius: var(--border-radius-md) var(--border-radius-md) 0 0;
  
  h2 {
    font-size: 2rem;
    font-weight: 600;
    margin: 0;
  }
`;

const FormContent = styled.div`
  padding: 2.4rem;
`;

function CreateCabinFormv1({ editCbin = {}, closeModal }) {
  const { id: idEdit, ...valueEdit } = editCbin;
  console.log(valueEdit);
  const isEditSeesion = Boolean(idEdit);

  const { register, handleSubmit, formState, reset } = useForm({
    defaultValues: isEditSeesion ? valueEdit : {},
  });

  const { CreateCabin, isCreating } = useCreateCabin();
  const { editCabin, isEditing } = useEditCabin();

  const { errors } = formState;
  const isLoading = isCreating || isEditing;
  const onSubmit = (data) => {
    console.log("Form data:", data);
    console.log("Image file:", data.image);

    if (isEditSeesion) {
      // EDIT
      editCabin(
        { newCabin: data, id: idEdit },
        {
          onSuccess: () => {
            reset();
            closeModal?.();
          },
        }
      );
    } else {
      // CREATE
      CreateCabin(data, {
        onSuccess: () => {
          reset();
          closeModal?.();
        },
      });
    }
  };
  const onError = (error) => {
    console.log(error);
  };
  if (isLoading) return <Spinner />;
  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)} type="modal">
      <FormHeader>
        <h2>{isEditSeesion ? "Edit Cabin" : "Add new Cabin"}</h2>
      </FormHeader>
      
      <FormContent>
        <FormRow label="Cabin Name" error={errors?.name?.message}>
          <Input
            type="text"
            id="nameCabin"
            disabled={isLoading}
            {...register("name", { required: "This field is required" })}
          />
        </FormRow>

      <FormRow label="Maximum Capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isLoading}
          {...register("maxCapacity", {
            required: "This field is required",
            min: { value: 1, message: "Capacity should be at least 1" },
          })}
        />
      </FormRow>

      <FormRow label="Regular Price" error={errors?.regularPrice?.message}>
        <Input
          type="text"
          id="regularPrice"
          disabled={isLoading}
          {...register("regularPrice", {
            required: "This field is required",
            validate: (value) => value >= 0 || "Price should be at least 1",
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          disabled={isLoading}
          defaultValue={0}
          {...register("discount", {
            required: "This field is required",
            validate: (value) => value >= 0 || "Discount cannot be negative",
          })}
        />
      </FormRow>

      <FormRow label="Description" error={errors?.description?.message}>
        <Textarea
          id="description"
          disabled={isLoading}
          {...register("description", { required: "This field is required" })}
        />
      </FormRow>
      <FormRow label="image" error={errors?.image?.message}>
        <Input
          id="image"
          type="file"
          accept="image/*"
          disabled={isLoading}
          {...register("image", {
            validate: (fileList) => {
              if (!isEditSeesion && (!fileList || fileList.length === 0)) {
                return "Image is required";
              }
              return true;
            },
          })}
        />
      </FormRow>

      <FormRow>
        <Button variation="secondary" type="reset" disabled={isLoading}>
          Reset
        </Button>
        <Button disabled={isLoading}>
          {isEditSeesion ? "Edit Cabin" : "Create Cabin"}
        </Button>
      </FormRow>
      </FormContent>
    </Form>
  );
}

export default CreateCabinFormv1;
