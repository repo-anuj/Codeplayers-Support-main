import React, { useState, useMemo, useCallback } from "react";
import { Label, Col } from "reactstrap";
import Select from "react-select";

const CPDropDownBox = ({
  labelTitle,
  choicesFromApi,
  id,
  value,
  onBlur,
  onChange,
  error,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isSelected, setIsSelected] = useState(false);

  const options = useMemo(
    () =>
      choicesFromApi?.map((choice) => ({
        primaryKeyValue: choice.primaryKey,
        value: choice.mainColumn,
        label: choice.mainColumn,
        masterFilter: choice.masterFilter,
        code: choice.code,
      })),
    [choicesFromApi]
  );

  const filterOption = useCallback(({ label, data }, input) => {
    if (!input) return true;
    const lowercasedInput = input.toLowerCase();
    return (
      label?.toLowerCase().includes(lowercasedInput) ||
      data?.masterFilter?.toLowerCase().includes(lowercasedInput)
    );
  }, []);

  const handleChange = useCallback(
    (selectedOption) => {
      onChange(selectedOption ? selectedOption.value : null);
      setIsSelected(!!selectedOption);
    },
    [onChange]
  );

  const customStyles = {
    menu: (provided) => ({
      ...provided,
      zIndex: 999,
    }),
    control: (provided) => ({
      ...provided,
      width: "100%",
      borderColor: error ? "#F06548" : provided.borderColor,
    }),
  };

  return (
    <>
      <Label className="mb-1" htmlFor={id}>
        {labelTitle}
      </Label>
      <Select
        styles={customStyles}
        options={options}
        value={options?.find((option) => option.value === value) || null}
        onFocus={() => {
          setIsFocused(true);
          setIsSelected(false);
        }}
        onBlur={onBlur}
        onChange={handleChange}
        filterOption={filterOption}
      />
      {error && (
        <div
          style={{
            color: "#F06548",
            marginTop: "4px",
            fontSize: "0.775rem",
          }}
        >
          {error}
        </div>
      )}
    </>
  );
};

export default CPDropDownBox;
