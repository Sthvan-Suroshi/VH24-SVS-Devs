import React from "react";
import { useForm } from "react-hook-form";
import InputField from "./InputField";
import BackButton from "./BackButton";
import { useDispatch } from "react-redux";
import { donorSignup } from "../../store/slices/authSlice";
import { useNavigate } from "react-router-dom";

const DonorRegistrationForm = ({ onBack }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    console.log("Donor form submitted:", data);
    const res = await dispatch(donorSignup(data));
    console.log("res from donor", res);

    // if(res.type===)
  };
  return (
    <div className="max-w-lg mx-auto mt-10 p-20 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Donor Registration
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <InputField
          label="Name"
          type="text"
          name="name"
          register={register}
          error={errors.name}
        />
        <InputField
          label="Email"
          type="email"
          name="email"
          register={register}
          error={errors.email}
        />
        <InputField
          label="Password"
          type="password"
          name="password"
          register={register}
          error={errors.password}
        />
        <InputField
          label="Address"
          type="text"
          name="address"
          register={register}
          error={errors.address}
        />

        <div className="flex justify-between mt-6">
          <BackButton onClick={onBack} />
          <button
            type="submit"
            className="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default DonorRegistrationForm;
