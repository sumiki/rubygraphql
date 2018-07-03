import React from 'react';
import ReactDOM from 'react-dom';

import {
    QueryRenderer,
    graphql,
} from 'react-relay';
import {
    Environment,
    Network,
    RecordSource,
    Store,
} from 'relay-runtime';
import Users from "../components/users";

function fetchQuery(
    operation,
    variables,
) {
    return fetch('/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query: operation.text,
            variables,
        }),
    }).then(response => {
        return response.json();
    });
}

const modernEnvironment = new Environment({
    network: Network.create(fetchQuery),
    store: new Store(new RecordSource()),
});

ReactDOM.render(
<QueryRenderer
environment={modernEnvironment}
query={graphql`
      query appQuery {
          users {
            id
            name
            email
          }
        }
    `}
variables={{}}
render={({error, props}) => {
    if (props) {
        return <Users { ...props } />;
    } else {
        return <div>Loading</div>;
    }
}}
/>,
document.getElementById('root')
);

