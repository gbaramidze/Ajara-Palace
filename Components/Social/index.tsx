import * as React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
const style = require("./style.scss");
const Social = ({icon, url}) => (
  <div className={style.socialItem}>
    <a href={url} rel="nofollow noopener" target="_blank">
      <FontAwesomeIcon icon={icon}/>
    </a>
  </div>
);

export default Social
