import * as React from 'react';
const style = require('./style.scss');

export default class Spinner extends React.Component {
    render(): React.ReactElement {
        return <div className={style.spinnerWrapper}>
            <svg className={style.spinner} viewBox="0 0 50 50">
                <circle className={style.path} cx="25" cy="25" r="20" fill="none" strokeWidth={2}/>
            </svg>
        </div>
    }
}
