import React, {PureComponent} from 'react';

import {WithMount} from './utils';
import tryCatchComponent from '../src/try-catch-component';
import ErrorComponent from '../src/error.jsx';

describe('render', function() {
    test('catch errors and render ErrorComponent by default', () => {
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

    test('catch errors and call catchRender instead', () => {
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
});