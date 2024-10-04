import React from 'react';

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

export default InputField;
