import { Text } from "@chakra-ui/react";
import { useState } from "react";
import "moment/locale/es";

import moment from "moment";
import MomentUtils from "@date-io/moment";
import {
  DatePicker,
  KeyboardDateTimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";

moment.locale("es"); // it is required to select default locale manually

interface IFuntionChanged {
  (newValue: Date | null): void;
}
interface IProps {
  value?: Date | null;
  minDate?: Date | null;
  funtionChanged?: IFuntionChanged;
}
export default function AuxDate({}: IProps) {
  const [selectedDate, handleDateChange] = useState(new Date());

  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <KeyboardDateTimePicker
        variant="inline"
        ampm={false}
        label="With keyboard"
        value={selectedDate}
        onError={console.log}
        disablePast
        format="DD/MM/yyyy HH:mm"
        onChange={(value) =>
          console.log(moment(value).format("DD/MM/yyyy HH:mm"))
        }
      />
    </MuiPickersUtilsProvider>
  );
}

// import React from "react";

// const AuxDate = () => {
//   return <div>AuxDate</div>;
// };

// export default AuxDate;
