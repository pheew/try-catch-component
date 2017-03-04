[![CircleCI](https://circleci.com/gh/pheew/try-catch-component.svg?style=svg)](https://circleci.com/gh/pheew/try-catch-component)


# try-catch-component

A React component wrapper that catches errors.

## Installation

```bash
$ npm install try-catch-component
```

## Usage

ES2015
```javascript
import {PureComponent} from 'react';
import tryCatchComponent from 'try-catch-component';


class MyComponent extends PureComponent {
    render() {
        throw new Error('Oh no!')
    }
    
    renderFallback(e) {
        return (
            <span>Something went wrong</span>  
        );
    }
}


export default tryCatchComponent(MyComponent);
```

## API

TODO...


## License

MIT
