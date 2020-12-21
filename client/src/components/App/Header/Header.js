import React from 'react';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';


function LoginGoogleButton(){
    return <li><a href='/auth/google'>Login With Google</a></li>
}
function CreditsNumber(props){
    const creditsNumber=props.auth.credits;
    return <li>Credits: {creditsNumber}</li>
}
function LogoutButton(){
    return <li><a href='/auth/logout'>Logout</a></li>
}
function renderBrandTitle(auth){
    const brandTitleLink=
        auth
            ?'/surveys'
            :'/';
    return <Link to={brandTitleLink} className="left brand-logo">Emailey</Link>;
}
function BuyCreditsButton(){
    return <li><Link to='/payment/checkout'>Buy Credits</Link></li>
}
function renderButtons(auth){
    switch (auth){
        case null:
            return;
        case false :
            return <LoginGoogleButton/>
        default:
            return <React.Fragment>
                <BuyCreditsButton/>
                <CreditsNumber auth={auth}/>
                <LogoutButton/>
            </React.Fragment>
    }
}
export default function Header(){
    const auth=useSelector(function(state){
        return state.auth
    });
    return <nav>
                <div className="nav-wrapper" style={{padding:'0 1rem'}}>
                    {renderBrandTitle(auth)}
                    <ul id="nav-mobile" className="right">
                        {renderButtons(auth)}
                    </ul>
                </div>
            </nav>
}