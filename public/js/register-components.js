class RegisterBox extends React.Component {

    constructor() {
        super();

        this.state ={
            message: "",
            redirect: false
        }
    }

    render() {

        if(this.state.redirect) {
            return (
                <Redirect to="/session/new" />
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
                            <label htmlFor="name">Enter New User ID</label>
                            <input type="text" ref={(input) => this._name = input} className="form-control" id="name" placeholder="Enter user ID" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Enter New Password</label>
                            <input type="password" ref={(input) => this._password = input} className="form-control" id="password" placeholder="Password" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Re-enter New Password</label>
                            <input type="password" ref={(input) => this._reenterPassword = input} className="form-control" id="reenterPassword" placeholder="Re-enter Password" />
                        </div>
                        <button type="submit" className="btn btn-primary">Create New Account</button>
            </form>
            <p></p>
            <button type="button" onClick={this._back.bind(this)} className="btn btn-primary">Back</button>
                </div>
                <div className="col-sm"></div>
            </div>
        </div>

        );
    }

    _back(e){
      e.preventDefault();
      this.setState({
        redirect: true
      });
    }

    _handleSubmit(e) {

        e.preventDefault();
        if(this._name.value!="" && this._password.value!="" && this._reenterPassword.value!="" && this._reenterPassword.value == this._password.value){
          let session = {
              name: this._name.value,
              password: this._password.value,
          }

          $.ajax({
              type: "POST",
              url: "/api/account/register",
              data: session
          }).done((res, status, xhr) => {
              console.log("done");
              sessionStorage.setItem("token", xhr.getResponseHeader("Authorization"));
              this.setState({ redirect: true });
          }).fail((xhr) => {
              if(xhr.status == 500) {
                  this._showLoginError("Oops! Something went wrong!");
              }
          });
        }
        else if(this._name.value=="" || this._password.value=="" || this._reenterPassword.value==""){
          this._showLoginError("Fields must not be empty!");
        }
        else{
          this._showLoginError("Password did not match!");
        }
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
