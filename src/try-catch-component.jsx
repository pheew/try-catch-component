import React, {PureComponent, PropTypes} from 'react';

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

export class ErrorComponent extends PureComponent {
    render() {
        const {error} = this.props;

        return (
            <div>
                <h4>{error.message}</h4>
                <pre>
                    {error.stack}
                </pre>
            </div>
        );
    }
}
ErrorComponent.propTypes = {
    error: PropTypes.object
};

const lifeCycleMethods = [
    createWrapper('render', function(e)  {
            if (typeof this.renderFallback === 'function') {
                return this.renderFallback(e);
            }

            return (
                <ErrorComponent error={e}/>
            );
        }
    ),

    createWrapper('componentWillReceiveProps'),
    createWrapper('shouldComponentUpdate'),
    createWrapper('componentWillUpdate'),
    createWrapper('componentWillMount'),
    createWrapper('componentWillUnmount')
];

function tryCatchComponent(Component, renderFallback) {
    lifeCycleMethods.forEach(function(f) { f(Component.prototype)});

    return Component;
}

export default tryCatchComponent;