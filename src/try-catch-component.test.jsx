import React, {PureComponent} from 'react';
import {mount} from 'enzyme';

import tryCatchComponent from './try-catch-component';
import ErrorComponent from './error.jsx';

test('catch render errors and render ErrorComponent instead', () => {
    const TestComponent = tryCatchComponent(
        class extends PureComponent {
            render() {
                throw new Error('SOME');
            }
        }
    );

    WithMount(<TestComponent some="some"/>, (comp) => {
        expect(comp.find(ErrorComponent).nodes.length).toBeTruthy();
    });
});

test('catch render errors and call renderFallback instead', () => {
    const TestComponent = tryCatchComponent(
        class extends PureComponent {
            render() {
                throw new Error('SOME');
            }

            catchRender(error) {
                return (
                    <span>{error.message}</span>
                );
            }
        }
    );

    WithMount(<TestComponent some="some"/>, (comp) => {
        expect(comp.find('span').text()).toBe('SOME');
    });
});




function WithMount(jsx, scope) {
    const component = mount(jsx);
    try {
        scope(component);
    } finally {
        component.unmount();
    }
}