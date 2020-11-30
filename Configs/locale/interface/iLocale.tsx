import {LocalizedStringsMethods} from "react-localization";

export default interface ILocale extends LocalizedStringsMethods{
    NAVIGATION: {
        "HOME": string
        "MENU": string
        "GALLERY": string
        "RESERVATION": string
        "HOTEL": string
        "CONTACT": string
    },
    RESERVATION: {
        TABLE: string
        TABLE_SUBTITLE: string
        DATE: string
        DATE_SUBTITLE: string
        MENU: string
        MENU_SUBTITLE: string
        MY_ORDER: string
        FEE: string
        ORDER_BUTTON: string
        TOTAL: string
        TIME: string
    }
}
