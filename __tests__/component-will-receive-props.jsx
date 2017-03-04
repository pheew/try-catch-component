import React, {PureComponent} from 'react';

import {WithMount} from './utils';
import tryCatchComponent from '../src/try-catch-component';

describe('componentWillReceiveProps', () => {

    const error = new Error("componentWillReceiveProps failed");

    const mock = jest.fn(() => {
        throw error;
    });

    beforeEach(() => {
        mock.mockClear();
    });

    test("catch errors when componentWillReceiveProps throws them", () => {
        const TestComponent = tryCatchComponent(
            class extends PureComponent {
                componentWillReceiveProps() {
                    mock.apply(this, arguments);
                }

                render() {
                    return (
                        <span>SOME</span>
                    );
                }
            }
        );

        WithMount(<TestComponent some="bla"/>, function (comp) {
            comp.setProps({some: 'some'});
        });
    });

    test("catch errors and call catch function", function () {
        const catchMock = jest.fn();

        const TestComponent = tryCatchComponent(
            class extends PureComponent {
                componentWillReceiveProps() {
                    mock.apply(this, arguments);
                }

                catchComponentWillReceiveProps() {
                    catchMock.apply(this, arguments);
                }

                render() {
                    return (
                        <span>SOME</span>
                    );
                }
            }
        );

        WithMount(<TestComponent some="bla"/>, function (comp) {
            comp.setProps({some: 'some'});
        });

        expect(catchMock.mock.calls).toEqual([
            [
                {some: 'some'},
                {},
                error
            ]

        ]);
    });
});


