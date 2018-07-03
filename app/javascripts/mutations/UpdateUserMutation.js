
import {
    commitMutation,
    graphql,
} from 'react-relay';

const mutation = graphql`
  mutation UpdateUserMutation($input: UpdateUserMutationInput!) {
    updateUserMutation(input: $input) {
      user {
        id
        name
        email
      }
    }
  }
`;

function getOptimisticResponse(user) {
    console.log('getOptimisticResponse')
    return {
        updateUserMutation: {
            user: user
        }
    };
}

function commit(
    environment,
    user,
    callback
) {
    return commitMutation(
        environment,
        {
            mutation,
            variables: {
                input: {
                    id: user.id,
                    name: user.name,
                    email: user.email
                },
            },
            onCompleted: (response, errors) => {
                if( typeof(callback) === 'function' ){
                    callback()
                }
            },
            optimisticResponse: getOptimisticResponse(user),
        }
    );
}

export default {commit};
