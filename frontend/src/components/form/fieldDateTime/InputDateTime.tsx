import React, { useState } from "react";
import DatePicker from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/analog_time_picker";

import "react-multi-date-picker/styles/backgrounds/bg-dark.css";
import "react-multi-date-picker/styles/colors/red.css";
import "react-multi-date-picker/styles/colors/analog_time_picker_red.css";
import Toolbar from "react-multi-date-picker/plugins/toolbar";
import "react-multi-date-picker/styles/colors/red.css";
import moment from "moment";

const InputDateTime = () => {
  const [value, setValue] = useState(new Date());
  const handleChange = () => {
    setValue(value);
  };
  return (
    <>
      <DatePicker
        className="red"
        value={moment(value).toDate()}
        format="MM/DD/YYYY HH:mm"
        plugins={[
          <TimePicker hideSeconds />,
          <Toolbar position="bottom" sort={["today", "", "close"]} />,
        ]}
        minDate={new Date()}
      />
    </>
  );
};

export default InputDateTime;
