import React from "react";

function FileInput({ id, name, label, accept, helpText, onChange }) {
  return (
    <div className="mb-5">
      <label
        htmlFor={id}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>
      <input
        id={id}
        name={name}
        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
        aria-describedby={`${id}_help`}
        type="file"
        accept={accept}
        onChange={onChange}
      />
      {helpText && (
        <p
          className="mt-1 text-sm text-gray-500 dark:text-gray-300"
          id={`${id}_help`}
        >
          {helpText}
        </p>
      )}
    </div>
  );
}

export default FileInput;
