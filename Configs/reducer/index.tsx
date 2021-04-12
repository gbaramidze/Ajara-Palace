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

const getOrders = () => JSON.parse(localStorage.getItem("orders"));
const setOrders = (orders) => localStorage.setItem("orders", JSON.stringify(orders));

const getForm = () => JSON.parse(localStorage.getItem("form"));
const setForm = (form) => localStorage.setItem("form", JSON.stringify(form));

const initialForm = {
    mobile: '',
    address: '',
    entrance: '',
    floor: '',
    flat: '',
    comment: '',
    paymentType: 0
};

const initialState = {
    locale,
    language: 'ka',
    loading: false,
    rooms: [],
    categories: [],
    order: getOrders() || [],
    form: getForm() || initialForm,
    sidebar: false,
    showMobile: false
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
        setOrders(action.payload.order);
        return {
            ...state,
            order: action.payload.order
        }
    }

    if(action.type === 'sidebar') {
        return {
            ...state,
            sidebar: action.payload
        }
    }

    if(action.type === 'showMobile') {
        return {
            ...state,
            showMobile: action.payload
        }
    }

    if(action.type === 'form') {
        setForm(action.payload);
        return {
            ...state,
            form: action.payload
        }
    }

    return state
}
