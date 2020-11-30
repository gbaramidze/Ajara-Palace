import * as React from "react"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {OverlayTrigger, Tooltip} from "react-bootstrap";
const style = require("./style.scss");
const PaymentRadio = ({options, selected, onChange}) => {
  const handleChange = (v) => {
    if(typeof onChange === "function") {
      onChange(v)
    }
  };
  return (
    <div className={style.radioBox}>
      {
        options ? options.map(({icon, label, disabled}, index) => {
            return disabled ? (
              <OverlayTrigger key={`option-${index}`}  overlay={<Tooltip id="tooltip-disabled">{disabled}</Tooltip>}>
                <span className={`${style.option} ${disabled ? style.disabled : ''}`}>
                  <div key={`option-${index}`} className={`${disabled ? style.disabled : ''}`}>
                    <FontAwesomeIcon icon={icon} />
                    {label}
                  </div>
                </span>
              </OverlayTrigger>
            ) : (
              <div key={`option-${index}`} className={`${style.option} ${selected === index ? style.selected : ''}  ${disabled ? style.disabled : ''}`} onClick={() => handleChange(index)}>
                <FontAwesomeIcon icon={icon} />
                {label}
              </div>
            )
          }) : null
      }
    </div>
  )
};

export default PaymentRadio;
