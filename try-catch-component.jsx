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
    createWrapper('render', function (e) {
        return (
            <span>Caught error!</span>
        );
    })
];

function tryCatchComponent(Component) {

    for (let wrapper of lifeCycleMethods) {
        wrapper(Component.prototype);
    }


    return Component;
}

export default tryCatchComponent;