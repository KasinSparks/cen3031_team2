import React, { useState } from "react";
import "./CustomDropdown.css";

  function CustomDropdown({ id, options, list, updateList, return_index }) {
    const [selected, setSelected] = useState();
    const handleChange = (event) => {
      setSelected(event.target.value);
      const newlist = [...list];
      newlist[return_index] = event.target.value;
      updateList(newlist);
    };

    return (
        <div>

            <select id={id} value={selected} name={id} onChange={handleChange}>
          <option value="">Select an option</option>
          {options.map((option, index) => (
            <option key={index} value={options[index]}>
              {option}
            </option>
          ))}
        </select>
      </div>
    );
  }

export default CustomDropdown;
