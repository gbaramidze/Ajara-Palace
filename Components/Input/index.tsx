import * as React from "react"
import * as InputMask from 'react-input-mask';
const style = require("./style.scss");

type InputType = "textarea" | "text" | "number" | "tel" | "email" | "submit" | "button"

interface IInput {
  label: string;
  placeholder?: string;
  mask?: string;
  maskChar?: string;
  type?: InputType;
  rows?: number;
  value?: string;
  error?:boolean;
  [key: string]: any
}
const Input = ({label, error ,ref, value, type, placeholder, ...props}: IInput) => {
  const [active, setActive] = React.useState(false);
  const [inFocus, setInFocus] = React.useState(false);
  const setLabelActive = () => {
    setInFocus(true);
    if(!active) {
      setActive(true);
    }
  };
  const setLabelInActive = (e) => {
    setInFocus(false);
    const value = e.currentTarget.value;
    if(!value && active) {
      setActive(false)
    }
    if(props.onBlur && typeof props.onBlur === "function") {
      props.onBlur(e);
    }
  };

  React.useEffect(() => {
    if(value){
      setActive(true)
    }
  }, [value]);
  return (
    <div className={`${style.inputContainer} ${type === "textarea" ? style.textarea : ''} ${error ? style.error : ''} ${inFocus ? style.inFocus : ''}`}>
      <label className={`${style.inputLabel} ${type === "textarea" ? style.textarea : ''} ${active ? style.active : ''}`}>{label}</label>
      {
        type !== "textarea" ? (
          <InputMask
            {...props}
            className={style.input}
            value={value || ''}
            onFocus={setLabelActive}
            onBlur={setLabelInActive}
          />
        ) : (
          <textarea
            {...props}
            placeholder={active && placeholder ? placeholder : ''}
            className={style.input}
            value={value || ''}
            onFocus={setLabelActive}
            onBlur={setLabelInActive}
          />
        )
      }
    </div>
  )
};

export default React.memo(Input);
