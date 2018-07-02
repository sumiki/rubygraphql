// @flow

import React from 'react';
import {
    createFragmentContainer,
    graphql,
} from 'react-relay';

class TodoApp extends React.Component {
    render() {
        return <div>
            { this.props.testfield }
        </div>
    }
}
export default TodoApp
