import React from "react";
import { useForm } from "react-hook-form";
import { useCreateCabin } from "./useCreateCabin"; // Import hook này nếu bạn đã định nghĩa
import FormRow from "./../../ui/FormRow";
import Input from "./../../ui/Input";
import Button from "./../../ui/Button";
import Form from "./../../ui/Form";
import { Textarea } from "./../../ui/Textarea";
import Spinner from "./../../ui/Spinner";

function CreateCabinForm({ closeModal }) {
  const { mutate, isLoading } = useCreateCabin();

  const { register, handleSubmit, formState, reset } = useForm();
  const { errors } = formState;

  const onSubmit = (data) => {
    console.log("Form data:", data);
    console.log("Image file:", data.image); // Phải thấy File object
    
    mutate(data, {
      onSuccess: () => {
        reset();
        closeModal?.(false);
      },
    });
  };
  // const onSubmitImg = (data) => {
  //   mutate({...data , image : data.image.at[0]})
  // }

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
            required: "This field is required",
            // Sửa lại đây - lấy file đầu tiên từ FileList
            setValueAs: (fileList) => {
              if (!fileList || fileList.length === 0) return null;
              return fileList[0]; // Trả về File object, không phải FileList
            },
          })}
        />
      </FormRow>

      <FormRow>
        <Button
          variation="secondary"
          type="reset"
          disabled={isLoading}
          onClick={() => closeModal((close) => !close)}
        >
          Cancel
        </Button>
        <Button disabled={isLoading}>Create Cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
