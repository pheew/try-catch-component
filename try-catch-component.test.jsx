import React, {PureComponent} from 'react';
import {mount} from 'enzyme';

import tryCatchComponent from './try-catch-component';

test('It should catch render errors', () => {
    WithMount(<TestComponent />, (comp) => {

    });
});

const TestComponent = tryCatchComponent(
    class extends PureComponent {
        render() {
            throw new Error('SOME');
        }
    }
);

function WithMount(jsx, scope) {
    const component = mount(jsx);
    try {
        scope(component);
    } finally {
        component.unmount();
    }
}