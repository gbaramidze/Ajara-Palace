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
locale.setLanguage('ka');

const initialState = {
    locale,
    language: 'ka',
    loading: false,
    rooms: [],
    categories: [],
    order: []
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
    if(action.type === 'loading') {
        return {
            ...state, loading: action.payload.loading,
        }
    }

    if(action.type === 'rooms') {
        return {
            ...state, rooms: action.payload.rooms,
        }
    }

    if(action.type === 'categories') {
        return {
            ...state, categories: action.payload.categories,
        }
    }

    if(action.type === 'order') {
        return {
            ...state, order: action.payload.order,
        }
    }

    return state
}
