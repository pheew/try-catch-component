import React, {PureComponent, PropTypes} from 'react';

class ErrorComponent extends PureComponent {
    static propTypes = {
        error: PropTypes.object
    };

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

export default ErrorComponent;