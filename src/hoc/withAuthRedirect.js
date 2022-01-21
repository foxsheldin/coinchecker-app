import React from 'react'
import { connect } from 'react-redux';
import { useNavigate} from 'react-router-dom';

export const withAuthRedirect = (Component) => {
    const RedirectComponent = (props) => {
        /* let navigate = useNavigate();
        if (!props.isAuth) navigate("/auth"); */
        return <Component {...props} />
    }

    const mapStateToPropsForRedirect = (state) => {
        return {
            isAuth: state.auth.isAuth
        }
    } 
    const ConnectedAuthRedirectComponent = connect(mapStateToPropsForRedirect)(RedirectComponent); 

    return ConnectedAuthRedirectComponent;
}
