import * as React from 'react';

import LocalizedStrings from 'react-localization';

import ka from "../locale/translate/ka";
import ru from "../locale/translate/ru";
import en from "../locale/translate/en";

const locales = {
    ka,
    ru,
    en
};

const locale = new LocalizedStrings(locales);

const initialState = {
    locale,
    language: 'en'
};

export default function reducer(state = initialState, action) {
    if(action.type === 'changeLanguage') {
        locale.setLanguage(action.payload.language);
        return {
            ...state,
            language: action.payload.language,
            locale
        }
    }
    return state
}
