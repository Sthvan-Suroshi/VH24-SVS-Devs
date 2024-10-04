import React, { useState } from 'react';
import { useForm } from 'react-hook-form';


const InputField = ({ label, type, name, register, error }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <input
      type={type}
      {...register(name, { required: `${label} is required` })}
      className={`mt-1 block w-full p-2 border rounded-md focus:ring focus:ring-blue-300 ${error ? 'border-red-500' : 'border-gray-300'}`}
    />
    {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
  </div>
);


const BackButton = ({ onClick }) => (
  <button
    onClick={onClick}
    className="py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-200"
  >
    Back
  </button>
);


const DonorRegistrationForm = ({ onBack }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log('Donor form submitted:', data);
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-20 bg-white rounded-lg shadow-md"> {}
      <h2 className="text-2xl font-bold mb-6 text-center">Donor Registration</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <InputField label="Name" type="text" name="name" register={register} error={errors.name} />
        <InputField label="Email" type="email" name="email" register={register} error={errors.email} />
        <InputField label="Password" type="password" name="password" register={register} error={errors.password} />
        
        {}
        <InputField label="Address" type="text" name="address" register={register} error={errors.address} />

        <div className="flex justify-between mt-6">
          <BackButton onClick={onBack} />
          <button type="submit" className="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};


const ShopkeeperRegistrationForm = ({ onBack }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log('Shopkeeper form submitted:', data);
  };

  return (
    <div className="w-400 mx-auto mt-10 p-20 bg-white rounded-lg shadow-md"> {}
      <h2 className="text-2xl font-bold mb-6 text-center">Shopkeeper Registration</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <InputField label="Name" type="text" name="name" register={register} error={errors.name} />
        <InputField label="Shop Name" type="text" name="shopName" register={register} error={errors.shopName} />
        <InputField label="Password" type="password" name="password" register={register} error={errors.password} />
        <InputField label="Address" type="text" name="address" register={register} error={errors.address} />
        <InputField label="City" type="text" name="city" register={register} error={errors.city} />
        <InputField label="District" type="text" name="district" register={register} error={errors.district} />
        <InputField label="State" type="text" name="state" register={register} error={errors.state} />
        <InputField label="Pincode" type="text" name="pincode" register={register} error={errors.pincode} />

        <div className="flex justify-between mt-6">
          <BackButton onClick={onBack} />
          <button type="submit" className="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};


const App = () => {
  const [userType, setUserType] = useState('');

  const handleSelection = (type) => {
    setUserType(type);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 ">
      {userType === '' ? (
        <div className="max-w-md mx-auto p-20 bg-white rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-bold mb-6">Select Registration Type</h2>
          <button
            onClick={() => handleSelection('donor')}
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200 mb-4"
          >
            Donor
          </button>
          <button
            onClick={() => handleSelection('shopkeeper')}
            className="w-full py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-200"
          >
            Shopkeeper
          </button>
        </div>
      ) : userType === 'donor' ? (
        <DonorRegistrationForm onBack={() => setUserType('')} />
      ) : (
        <ShopkeeperRegistrationForm onBack={() => setUserType('')} />
      )}
    </div>
  );
};

export default App;
