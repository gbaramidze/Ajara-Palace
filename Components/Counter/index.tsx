import * as React from 'react';
import {Button} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMinus, faPlus, faTrash} from "@fortawesome/free-solid-svg-icons";
const style = require('./style.scss')

interface CounterProps {
    children: number;
    increment(): void;
    decrement(): void;
}

export default class Counter extends React.PureComponent<CounterProps,{}> {
    render(): React.ReactElement{
        return <div className={style.counterWrapper}>
            <div className={style.counter}>
                <Button size='sm' variant='light' onClick={this.props.increment}><FontAwesomeIcon icon={faPlus} /></Button>
                <div className={style.count}>
                    {this.props.children}
                </div>
                <Button size='sm' variant='light' onClick={this.props.decrement}>{
                    this.props.children > 1 ? <FontAwesomeIcon icon={faMinus} /> : <FontAwesomeIcon icon={faTrash} />
                }</Button>
            </div>
        </div>;
    }
}
