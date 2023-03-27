import { FC } from "react";

export type SelectProps = {
  options: any[];
  value: any;
  onChange: (value: any) => void;
};

const Select: FC<SelectProps> = ({ options, value, onChange }) => {
  return (
    <select
      value={value}
      onChange={(e) => {
        onChange(e.target.value);
      }}
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default Select;