import * as React from 'react';
import { Container, Nav, Tab} from "react-bootstrap";
import {connect} from "react-redux";
import Table from "../../Components/Table";
import {iTable} from "../../Components/Table/interface";
import Steps from "../../Components/Steps";
import {faBars, faCalendarAlt, faChair, faCheck} from "@fortawesome/free-solid-svg-icons";
import iLocale from "../../Configs/locale/interface/iLocale";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as moment from 'moment';
import { registerLocale } from  "react-datepicker";
import {ru, ka} from 'date-fns/locale';
import Spinner from "../../Components/Spinner";
import {Rooms} from "./interface";
registerLocale('ru', ru);
registerLocale('ka', ka);

const style = require('./style.scss');

const mapStateProps = state => {
    return {
        loading: state.loading,
        rooms: state.rooms,
        locale: state.locale,
        language: state.language,
        categories: state.categories
    }
};

interface Props {
    loading: boolean
    dispatch: any,
    rooms: string[],
    categories: string[],
    locale: iLocale,
    language: string,
    selectedTable: string,
    selectedDate: string
}

class Reservation extends React.Component {
    props: Props;
    controller: AbortController = new AbortController();
    state = {
        rooms: [],
        categories: [],
        loading: false,
        step: 3,
        selected: [],
        selectedTable: null,
        startDate: moment().add(2,'days').toDate(),
        selectedDate: null,
        locale: null,
        language: null
    };

    constructor(props) {
        super(props);
        this.props = props;
        this.state.locale = props.locale;
        this.state.language = props.language;
        moment.locale(props.language)
    }
    componentWillReceiveProps(nextProps: any,  nextContext: any): void {
        moment.locale(nextProps.language);
        if(this.state.language !== nextProps.language) {
            this.setState({
                language: nextProps.language
            })
        }
    }

    componentDidMount(): void {
        this.getTables();
    }

    getTables(): void {
        const {dispatch, rooms} = this.props;
        if(!rooms.length) {

            // sets up loading
            dispatch({
                type: 'loading',
                payload: {
                    loading: true,
                }
            });

            // getting data about rooms

            fetch("https://ajarapalace.ge/admin/ajax/?rooms",{ signal: this.controller.signal }).then(res=> {
                return res.json()
            }).then(response=>{
                const rooms: Rooms = response.rooms.reverse();
                this.setState({
                    rooms
                });


                dispatch({
                    type: 'loading',
                    payload: {
                        loading: false,
                    }
                });
                dispatch({
                    type: 'rooms',
                    payload: {
                        rooms
                    }
                })

            }).catch()
        } else {
            this.setState({
                rooms: this.props.rooms
            })
        }
    }



    componentWillUnmount(): void {
        const {dispatch} = this.props;
        const {rooms} = this.state;

        if(!rooms.length) {
            this.controller.abort();
            dispatch({
                type: 'loading',
                payload: {
                    loading: false,
                }
            });
        }
    }

    selectTable = (floor, table) => {
        const { locale } = this.state;
        this.setState({
            step: 2,
            selectedTable: `${locale.RESERVATION.TABLE} ${table} - ${floor}`
        },()=> {
            document.querySelector('.step.active').scrollIntoView({block: 'end', inline: 'start'});
        });
    };

    setStep = num => {
        this.setState({step: num},()=> {
            document.querySelector('.step.active').scrollIntoView({block: 'end', inline: 'start'});
        });
    };

    handleDate = startDate => {
        this.setState({
            startDate,
            selectedDate: startDate
        });
    };

    render(): React.ReactElement {
        const { step, locale, selectedTable, selectedDate , startDate, language} = this.state;
        const {loading, rooms, categories} = this.props;
        const minTime = moment("10:00", "HH:mm").toDate();
        const maxTime = moment("21:00", "HH:mm").toDate();
        return <>
            <div className={style.bgWrapper}>
                <Container>
                    <Steps
                        count={3}
                        active={step}
                        steps={[
                                {
                                    title: locale.RESERVATION.TABLE,
                                    subtitle: selectedTable || locale.RESERVATION.TABLE_SUBTITLE,
                                    icon: faChair
                                },
                                {
                                    title: locale.RESERVATION.DATE,
                                    subtitle: selectedDate ? moment(selectedDate).format('dddd, DD MMMM YYYY - HH:mm') : locale.RESERVATION.DATE_SUBTITLE,
                                    icon: faCalendarAlt
                                },
                                {
                                    title: locale.RESERVATION.MENU,
                                    subtitle: locale.RESERVATION.MENU_SUBTITLE,
                                    icon: faBars
                                },

                            ]}
                        callBack={this.setStep}
                    />

                    {step === 1 && (loading ? <Spinner /> : <Tab.Container id="reservation" defaultActiveKey="room-0">
                        <Nav variant="pills" className={style.navWrapper}>
                            {Object.values(rooms).map((room, index: number) =>
                                <Nav.Item key={index}>
                                    <Nav.Link
                                        eventKey={`room-${index}`}
                                        onClick={()=> document.activeElement.scrollIntoView({block: 'end', inline: 'center'})}
                                    >
                                        {room.name}
                                    </Nav.Link>
                                </Nav.Item>
                            )}
                        </Nav>
                        <Tab.Content>
                            {Object.values(rooms).map((room, index: number): React.ReactNode =>
                                <Tab.Pane eventKey={`room-${index}`} key={index}  className={style.tableList}>
                                    {Object.values(room.tables).map((table: iTable,i)=>
                                        <Table coords={table.coords} type={table.type} number={table.number} key={i} onClick={()=> this.selectTable(room.name, table.number)}/>
                                    )}
                                </Tab.Pane>
                            )}
                        </Tab.Content>
                    </Tab.Container>
                    )
                    }
                    {step === 2 && <div className={style.datepicker}>
                        <DatePicker
                            selected={startDate}
                            minDate={moment().add(1,'days').toDate()}
                            onChange={this.handleDate}
                            inline
                            minTime={minTime}
                            maxTime={maxTime}
                            locale={language}
                            showTimeSelect
                            timeFormat="HH:mm"
                            timeIntervals={15}
                            dateFormat="MMMM d, yyyy hh:mm"
                            timeCaption={locale.RESERVATION.TIME}
                        />
                    </div>
                    }
                    {step === 3 && (loading || !categories.length ? <Spinner/> : <div>s</div>
                    )}
                </Container>
            </div>
        </>
    }
}

export default connect(mapStateProps)(Reservation);
