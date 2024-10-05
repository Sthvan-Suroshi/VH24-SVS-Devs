import React from "react";
import { useForm } from "react-hook-form";
import InputField from "./InputField";
import BackButton from "./BackButton";

const InstitutionRegistration = ({ onBack }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Institution form submitted:", data);
  };

  return (
    <div className="max-w-lg mx-auto mt-2 p-10 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Institution Registration
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <InputField
          label="Institution Name"
          type="text"
          name="institutionName"
          register={register}
          error={errors.institutionName}
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

        <div className="grid grid-cols-2 gap-4">
          <InputField
            label="City"
            type="text"
            name="city"
            register={register}
            error={errors.city}
          />
          <InputField
            label="District"
            type="text"
            name="district"
            register={register}
            error={errors.district}
          />
          <InputField
            label="State"
            type="text"
            name="state"
            register={register}
            error={errors.state}
          />
          <InputField
            label="Pincode"
            type="text"
            name="pincode"
            register={register}
            error={errors.pincode}
          />
        </div>

        <InputField
          label="Contact Info"
          type="text"
          name="contactInfo"
          register={register}
          error={errors.contactInfo}
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

export default InstitutionRegistration;
