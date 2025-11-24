import React from "react";
import { useForm } from "react-hook-form";
import { useCreateEditCabin } from "./useCreateCabin"; // Import hook này nếu bạn đã định nghĩa
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import { Textarea } from "../../ui/Textarea";
import Spinner from "../../ui/Spinner";

function CreateCabinFormv1({ editCbin = {} ,closeModal}) {
  const { id: idEdit, ...valueEdit } = editCbin;
  console.log(valueEdit);
  const isEditSeesion = Boolean(idEdit);

  const { register, handleSubmit, formState, reset } = useForm({
    defaultValues: isEditSeesion ? valueEdit : {},
  });

  const { mutate, isLoading } = useCreateEditCabin();

  const { errors } = formState;

  const onSubmit = (data) => {
    console.log("Form data:", data);
    console.log("Image file:", data.image); // File (do setValueAs trả về)
    mutate(
      {
        newCabin : data,
        id: isEditSeesion ? idEdit : undefined, // create => undefined
      },
      {
        onSuccess: () => {
          reset();
           closeModal?.();

        },
      }
    );
  };
  const onError = (error) => {
    console.log(error);
  };
  if (isLoading) return <Spinner />;
  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)} type="modal">
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
    </Form>
  );
}

export default CreateCabinFormv1;
