import React, { useState } from "react";
import CreatableSelect from "react-select/creatable";
import { Form } from "react-bootstrap";

const DynamicSelect = ({ items, type, label }) => {
  const [options, setOptions] = useState(items);

  const handleCreateOption = (inputValue) => {
    const newOption = { value: inputValue, label: inputValue };
    setOptions((prevOptions) => [...prevOptions, newOption]);
  };

  return (
    <div>
      <Form.Group controlId="select">
        <Form.Label>{label}</Form.Label>
        <CreatableSelect
          isMulti
          options={options}
          onCreateOption={handleCreateOption}
          placeholder={`Select or add ${type}`}
        />
      </Form.Group>
    </div>
  );
};

export default DynamicSelect;
