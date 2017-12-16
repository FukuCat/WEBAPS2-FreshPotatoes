class LoginBox extends React.Component {

    constructor() {
        super();

        this.state ={
            message: "",
            redirect: false,
            createNew: false
        }
    }

    render() {
        if(this.state.redirect) {
            return (
                <Redirect to="/" />
            );
        }

        if(this.state.createNew){
          return (
              <Redirect to="/register/new" />
          );
        }

        return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-sm"></div>
                <div className="col-sm" id="col-sm-login">
            <div className="alert-login alert alert-danger invisible" role="alert">
                {this.state.message}
            </div>
                    <form onSubmit={this._handleSubmit.bind(this)}>
                        <div className="form-group">
                            <label htmlFor="name">User ID</label>
                            <input type="text" ref={(input) => this._name = input} className="form-control" id="name" placeholder="Enter user ID" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" ref={(input) => this._password = input} className="form-control" id="password" placeholder="Password" />
                        </div>
                        <button type="submit" className="btn btn-primary">Login</button>
            </form>
            <p></p>
            <button type="button" onClick={this._createAccount.bind(this)} className="btn btn-primary">Create New Account</button>
                </div>
                <div className="col-sm"></div>
            </div>
        </div>

        );
    }

    _createAccount(e){
      e.preventDefault();
      this.setState({
          createNew: true
      });
    }

    _handleSubmit(e) {

        e.preventDefault();

        let session = {
            name: this._name.value,
            password: this._password.value
        }

        $.ajax({
            type: "POST",
            url: "/api/session",
            data: session
        }).done((res, status, xhr) => {
            sessionStorage.setItem("token", xhr.getResponseHeader("Authorization"));
            sessionStorage.setItem("username", this._name.value);
            this.setState({ redirect: true });
        }).fail((xhr) => {
            if(xhr.status == 401) {
                this._showLoginError("Invalid name or password.");
            }
        });
    }

    _showLoginError(error) {
        this.setState({
            message: error
        });

        let loginAlert = $(".alert-login");

        if(loginAlert.hasClass("invisible")) {
            loginAlert.removeClass("invisible");
        }
    }
}
