import React, { Component } from "react";
import USER from "./constants";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSubmitting: false,
      isDisabled: true,
      isLoggedUser: false,
      email: "",
      emailError: false,
      password: "",
      passwordError: false,
      loginText: "Acceder",
      salirText: "Salir"
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const { email, password } = this.state;
    this.setState({
      loginText: "Accediendo...",
      isDisabled: true
    });

    setTimeout(() => {
      if (email === USER.email && password === USER.password) {
        this.setState({ isLoggedUser: true, salirText: "Salir" });
      } else {
        this.setState({
          loginText: "Acceder",
          email: "",
          password: ""
        });
      }
    }, 3000);
  }

  handleInput(e) {
    const name = e.target.name;
    const value = e.target.value;

    this.setState(
      {
        [name]: value
      },
      () => {
        if (
          this.validateEmail(this.state.email) &&
          this.validatePassword(this.state.password)
        ) {
          this.setState({ isDisabled: false });
        } else {
          this.setState({ isDisabled: true });
        }
      }
    );
  }

  validateEmail = email => {
    //const r = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const r = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return r.test(String(email).toLocaleLowerCase());
  };

  validatePassword = password => {
    return password.toString().length > 4 ? true : false;
  };

  render() {
    const { isLoggedUser } = this.state;
    let klass = "";
    if (this.state.email !== "" && this.state.password !== "") {
      klass = this.state.isDisabled ? "invalid" : "valid";
    }

    return (
      <div className="App">
        {!isLoggedUser ? (
          <div className={`login-form ${klass}`}>
            <h1>- LOGIN -</h1>
            <form onSubmit={this.handleSubmit}>
              <div className="wrapper">
                <input
                  type="text"
                  name="email"
                  value={this.state.email}
                  onChange={e => this.handleInput(e)}
                  className="input"
                  placeholder="E-mail"
                />
                <span className="underline" />
              </div>
              <div className="wrapper">
                <input
                  type="password"
                  name="password"
                  value={this.state.password}
                  onChange={e => this.handleInput(e)}
                  className="input"
                  placeholder="Password"
                />
                <span className="underline" />
              </div>
              <div>
                <button className="button" disabled={this.state.isDisabled}>
                  {this.state.loginText}
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="dashboard">
            <h1>Dashboard</h1>
            <p>Has iniciado sesión</p>
            <p>
              <svg
                id="successAnimation"
                className="animated"
                xmlns="http://www.w3.org/2000/svg"
                width="70"
                height="70"
                viewBox="0 0 70 70"
              >
                <path
                  id="successAnimationResult"
                  fill="#D8D8D8"
                  d="M35,60 C21.1928813,60 10,48.8071187 10,35 C10,21.1928813 21.1928813,10 35,10 C48.8071187,10 60,21.1928813 60,35 C60,48.8071187 48.8071187,60 35,60 Z M23.6332378,33.2260427 L22.3667622,34.7739573 L34.1433655,44.40936 L47.776114,27.6305926 L46.223886,26.3694074 L33.8566345,41.59064 L23.6332378,33.2260427 Z"
                />
                <circle
                  id="successAnimationCircle"
                  cx="35"
                  cy="35"
                  r="24"
                  stroke="#979797"
                  strokeWidth="2"
                  strokeLinecap="round"
                  fill="transparent"
                />
                <polyline
                  id="successAnimationCheck"
                  stroke="#979797"
                  strokeWidth="2"
                  points="23 34 34 43 47 27"
                  fill="transparent"
                />
              </svg>
            </p>
            <p>
              <button
                className="button"
                onClick={() => {
                  this.setState({ salirText: "Saliendo..." });
                  setTimeout(() => {
                    this.setState({
                      isLoggedUser: false,
                      email: "",
                      password: "",
                      loginText: "Acceder"
                    });
                  }, 2500);
                }}
              >
                {this.state.salirText}
              </button>
            </p>
          </div>
        )}
      </div>
    );
  }
}

export default App;
