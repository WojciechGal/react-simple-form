import React from "react";
import axios from 'axios';

export default class Form extends React.Component {
    state = {
        username: "",
        password: ""
    };

    change = e => {
        this.props.onChange({[e.target.name]: e.target.value});
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    onSubmit = async e => {
        e.preventDefault();

        axios.post('http://4bea6c2a.ngrok.io/users/login', {
                'username': this.state.username,
                'password': this.state.password,
            }
        ).then(function (response) {
            //handle success
            console.log(response);
            localStorage.setItem('token', response.data.accessToken)
            /*
            LOCALSTORAGE VS SESSIONSTORAGE
            localStorage and sessionStorage accomplish the exact same thing
            and have the same API, but with sessionStorage the data is persisted
            only until the window or tab is closed, while with localStorage the
            data is persisted until the user manually clears the browser cache
            or until your web app clears the data. The examples in this post are
            for localStorage, but the same syntax works for sessionStorage.
            */
        }).catch(function (response) {
            //handle error
            console.log(response);
        });

        // const headers = {
        //     'Content-Type': 'text/plain'
        // };
        //
        // await axios.post(
        //     'http://c0027b25.ngrok.io/users/login',
        //     {
        //         'username': this.state.username,
        //         'password': this.state.password,
        //     },
        //     {headers}
        // ).then(response => {
        //     console.log("Success ========>", response);
        // })
        //     .catch(error => {
        //             console.log("Error ========>", error);
        //         }
        //     )

        // var bodyFormData = new FormData();
        //
        // bodyFormData.set('username', this.state.username);
        // bodyFormData.set('password', this.state.password);
        //
        // axios({
        //     method: 'post',
        //     url: 'http://54d256d1.ngrok.io/users/login',
        //     data: bodyFormData,
        //     headers: {'Content-Type': 'multipart/form-data' }
        // })
        //     .then(function (response) {
        //         //handle success
        //         console.log(response);
        //     })
        //     .catch(function (response) {
        //         //handle error
        //         console.log(response);
        //     });

        this.setState({
            username: "",
            password: ""
        });
        this.props.onChange({
            username: "",
            password: ""
        });
    };

    checkUser = async e => {
        e.preventDefault();

        axios({
                method: 'get',
                url: 'http://4bea6c2a.ngrok.io/users/sec',
                headers: {'Authorization': 'Bearer ' + localStorage.getItem('token') }
            }
        ).then(function (response) {
            //handle success
            console.log(response);
        }).catch(function (response) {
            //handle error
            console.log(response);
        });
    };

    onLogout = async e => {
        e.preventDefault();

        localStorage.clear()
    };

    render() {
        return (
            <form>
                <input
                    name="username"
                    placeholder="Username"
                    value={this.state.username}
                    onChange={e => this.change(e)}
                />
                <br/>
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={this.state.password}
                    onChange={e => this.change(e)}
                />
                <br/>
                <button onClick={e => this.onSubmit(e)}>Submit</button>
                <br/>
                <button onClick={e => this.checkUser(e)}>Check User</button>
                <br/>
                <button onClick={e => this.onLogout(e)}>Logout</button>
            </form>
        );
    }
}
