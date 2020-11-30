import * as React from 'react';
import {Alert} from "react-bootstrap";
import values from "../../Configs/values";

const IsClose = ({message, callBack}) => {
  let timer;
  const [isError, setIsError] = React.useState(false);

  const checkDate = (date, time) => {
    const moreDate = new Date(`${new Date().toLocaleString().split(",")[0]} ${time}`).toLocaleString();
    return date > moreDate
  };

  const checkError = () => {
    const date = new Date(new Date().toLocaleString("en-US", {timeZone: 'Asia/Tbilisi'})).toLocaleString();
    const isStart = checkDate(date, values.working_hours.start);
    const isEnd =  checkDate(date, values.working_hours.end);

    if(isStart && isEnd && !isError) {
      setIsError(true);
      callBack(true);
    } else {
      if(isError) {
        callBack(false);
        setIsError(false)
      }
    }
  };

  const startTimer = () => {
    checkError();
    timer = setInterval(() => {
      checkError();
    }, 1000)
  };

  const stopTimer = () => {
    clearTimeout(timer);
  };

  React.useEffect(() => {
    startTimer();
    return () => stopTimer();
  }, []);

  return isError ? (
    <Alert variant="warning">
      {message}
    </Alert>
  ) : null
};

export default IsClose
