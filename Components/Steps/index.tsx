import * as React from 'react';
import * as PropType from 'prop-types'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
const style = require("./style.scss");

interface Step {
    title: string,
    subtitle: string,
    icon: any
}
interface iSteps {
    active: number,
    count: number,
    steps: Step[],
    callBack: any,
}

export default class Steps extends React.Component {
    static propTypes = {
        count: PropType.number.isRequired,
        active: PropType.number,
        steps: PropType.any,
        callBack: PropType.func
    };

    props: iSteps;
    constructor(props) {
        super(props);
        this.props = props;
    }

    setStep(number: number): void {
        const {active, callBack} = this.props;
        if(active > number) {
            callBack(number + 1);
        }
    }

    render(): React.ReactElement {
        const { active, steps } = this.props;
        return <>
            <div className={style.stepWrapper}>
                <div className={`${style.ui} ${style.steps}`}>
                    {Object.values(steps).map((step,i)=>
                        {
                            return <div className={style.step
                            + ((i+1) === active ? ' active' : '')
                            + ((i+1) > active ? ' disabled' : '')
                            } key={i} onClick={()=> this.setStep(i)}>
                                <FontAwesomeIcon icon={step.icon} className={style.icon}/>
                                <div className={style.content}>
                                    <div className={style.stepTitle}>{step.title}</div>
                                    <div className={style.stepSubTitle}>{step.subtitle}</div>
                                </div>
                            </div>
                        }
                    )}
                </div>
            </div>
        </>
    }
}
