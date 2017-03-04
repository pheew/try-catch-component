import {mount} from 'enzyme';

export function WithMount(jsx, scope) {
    const component = mount(jsx);
    try {
        scope(component);
    } finally {
        component.unmount();
    }
}