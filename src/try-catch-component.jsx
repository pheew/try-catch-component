import React from 'react';
import {ErrorComponent} from './error.jsx';

function createWrapper(funcName, onError) {
    return function (prototype) {
        if (!(funcName in prototype)) {
            return;
        }

        // If there's a catch[FuncName] on the component we'll use it as the onError callback
        const catchFuncName = 'catch' + funcName[0].toUpperCase() + funcName.slice(1);
        if (catchFuncName in prototype) {
            onError = prototype[catchFuncName];
        }

        // Wrap original function
        const original = prototype[funcName];
        prototype[funcName] = function () {

            //TODO: Test performance implications of try / catch
            try {
                return original.apply(this, arguments);

            } catch (e) {
                if (typeof onError === 'function') {
                    // onError receives [arguments..., e]
                    return onError.apply(this, Array.prototype.slice.call(arguments).concat(e));
                } else {
                    throw e;
                }
            }
        };
    };
}

const lifeCycleMethods = [
    createWrapper('render', function (e) {
            return <ErrorComponent error={e}/>;
        }
    ),

    createWrapper('componentWillReceiveProps', function(nextProps, e) {
        // console.error(e, {
        //     props: this.props,
        //     nextProps
        // });
    }),
    createWrapper('shouldComponentUpdate'),
    createWrapper('componentWillUpdate'),
    createWrapper('componentWillMount'),
    createWrapper('componentWillUnmount')
];

function tryCatchComponent(Component) {
    lifeCycleMethods.forEach(function (f) {
        f(Component.prototype)
    });

    return Component;
}

export default tryCatchComponent;