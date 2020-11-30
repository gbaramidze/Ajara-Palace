import * as React from 'react'
import {useEffect, useState} from "react";

const Spy = ({items, children, addClassName, onUpdate, className}) => {
    const [selectedElement, setSelectedElement] = useState(false);
    let Timeout;
    const startTracking = () => {
        if(Timeout) clearTimeout(Timeout);
        Timeout = setTimeout(()=> {
            for (let item of items) {
                const element = document.getElementById(item);
                if(element) {
                    if(isVisible(element)) {
                        setSelectedElement(item);
                        if(onUpdate && typeof onUpdate === "function") {
                            onUpdate(element);
                        }
                        return false;
                    }
                }
            }
        }, 300);
    };

    useEffect(()=> {
        window.addEventListener('scroll', startTracking)
        return () => window.removeEventListener("scroll",  startTracking)
    },[]);

    const modify = item => {
        const props = {
            ...item.props.className,
            [addClassName]: item.props.to === selectedElement ? addClassName : null
        };
        return React.cloneElement(item, props)
    };
    const modifyChilds = item => {
        const props = {
            className: {
                className
            },
            children: React.Children.map(item.props.children, child => modify(child)),
        };
        return React.cloneElement(item, props)
    };

    return React.Children.map(children, element=> modifyChilds(element))
};

function isVisible(elem) {
    return window.pageYOffset > elem.offsetTop && window.pageYOffset < (elem.offsetTop + elem.getBoundingClientRect().height);
}

export default React.memo(Spy)


