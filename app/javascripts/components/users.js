// @flow

import React from 'react';
import UpdateUserMutation from '../mutations/UpdateUserMutation'
import {
    createFragmentContainer,
    graphql,
} from 'react-relay';

class Users extends React.Component {
    state = {
        users: this.props.users,
        edit_user_id: 0
    }
    
    componentDidMount(){
    }
    
    handleEdit = (e, user) => {
        this.setState({
            edit_user_id: user.id
        })
    }
    
    handleUpdate = (e, user) => {
        var new_users = []
        this.state.users.forEach((eachUser, i) => {
            if( user.id === eachUser.id ){
                let new_user = Object.assign( {}, user )
                new_user.name = e.target.value
                new_users.push( new_user )
            } else {
                new_users.push( eachUser )
            }
        })
        this.setState({
            users: new_users
        })
    }
    
    handleSubmit = (e, user) => {
        UpdateUserMutation.commit(
            this.props.relay.environment,
            user,
            () => { this.setState({edit_user_id: 0}) }
        )
    }
    
    render() {
        return <div>
            <table>
                <tbody>
                    { ( () => {
                        return this.state.users.map((user, i) => {
                            let tmpUser = user
                            return <tr key={i}>
                                    <td>{ user.email }</td>
                                    <td>
                                        { ( () => {
                                            if( this.state.edit_user_id !== user.id ){
                                                return user.name
                                            } else {
                                                return <input
                                                    type="text"
                                                    value={ user.name }
                                                    onChange={ (e) => { this.handleUpdate(e, tmpUser) } }
                                                />
                                            }
                                        } )() }
                                    </td>
                                    <td>
                                        { ( () => {
                                            if( this.state.edit_user_id !== user.id ){
                                                return <a href="#" onClick={ (e) => { this.handleEdit( e, tmpUser ) } } >Edit</a>
                                            } else {
                                                return <a href="#" onClick={ (e) => { this.handleSubmit( e, tmpUser ) } } >Update</a>
                                            }
                                        } )() }
                                        
                                    </td>
                                </tr>
                        })
                    } )() }
                
                    
                </tbody>
            </table>

        </div>
    }
}
export default createFragmentContainer(Users, {})
