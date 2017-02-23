import React, {PureComponent} from 'react';

function createWrapper(funcName, onError) {
    return function (prototype) {
        if ((!funcName in prototype)) {
            return;
        }

        const original = prototype[funcName];
        prototype[funcName] = function () {
            try {
                return original.apply(this, arguments);

            } catch (e) {
                //TODO: log it maybe?
                if (typeof onError === 'function') {
                    return onError.call(this, e);
                }
            }
        };
    };
}

const lifeCycleMethods = [
    createWrapper('render', function () {
        return (
            <span>Caught error!</span>
        );
    }),

    createWrapper('componentWillReceiveProps'),
    createWrapper('shouldComponentUpdate'),
    createWrapper('componentWillUpdate'),
    createWrapper('componentWillMount')
];

function tryCatchComponent(Component) {
    lifeCycleMethods.forEach(f => f(Component.prototype));

    return Component;
}

export default tryCatchComponent;