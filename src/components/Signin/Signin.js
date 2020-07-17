import React from 'react';

function Signin(props) {

    let style = {
        backgroundColor: "pink",
        marginBottom: "50px"
    };

    let signinComponent = (
        <div style={style}>
            <div className="form-group">
                <label>Email address</label>
                <input type="email" className="form-control" id="exampleInputEmail1" name="email" onChange={(e) => props.onInputChange(e)} aria-describedby="emailHelp" placeholder="Enter email" />
                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div className="form-group">
                <label>Password</label>
                <input type="password" className="form-control" name="password" onChange={(e) => props.onInputChange(e)} id="exampleInputPassword1" placeholder="Password" />
            </div>
            <button className="btn btn-primary" onClick={props.submitBtnClicked}>sign in</button>
        </div>
    );


    //
    if (props.isSignedIn) {
        signinComponent = (
            <div id="signInComponent" style={style}>
                <h5>You're signed-in!</h5>
                <button onClick={props.testApiBtnClicked}>test api token</button>
                <button onClick={props.signoutBtnClicked}>signout</button>
            </div>
        );
    }


    //
    return signinComponent;
}



export default Signin;