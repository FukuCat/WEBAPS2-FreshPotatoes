class HomepageBox extends React.Component {

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
                <Redirect to="/" />
            );
        }

        return (
        <div>
        <nav className="navbar navbar-toggleable-md navbar-light bg-faded">
          <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
          </button>
          <a className="navbar-brand" href="#">Movie Review</a>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
            <a className="nav-link" href="homepage.html">Home <span className="sr-only">(current)</span></a>
            </li>
            <li className="nav-item">
            <a className="nav-link" href="user.html">User</a>
            </li>
            <li className="nav-item">
            <a className="nav-link" href="#">Logout</a>
            </li>
          </ul>
          <form className="form-inline my-2 my-lg-0">
            <input className="form-control mr-sm-2" type="text" placeholder="Search"/>
            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
          </form>
          </div>
        </nav>
        <div className="container-fluid">
            <div className="card">
              <div className="card text-center border-light mb-3">
                <div className="card-header">Rating: 4.5</div>
                <div className="card-body">
                <h4 className="card-title">Star Wars</h4>
                <p className="card-text">Walking the dog ca get tiring, but what if...</p>
                <a href="#" class="btn btn-primary">View Review</a>
                </div>
                <div className="card-footer text-muted">
                Reviews: 3
                </div>
              </div>
              <div className="card text-center border-light mb-3">
                <div className="card-header">
                Rating: 4.5
                </div>
                <div className="card-body">
                <h4 class="card-title">Fireworks</h4>
                <p className="card-text">Walking the dog ca get tiring, but what if...</p>
                <a href="#" className="btn btn-primary">View Review</a>
                </div>
                <div className="card-footer text-muted">
                Reviews: 3
                </div>
              </div>
              <div className="card text-center border-light mb-3">
                <div className="card-header">
                Rating: 4.5
                </div>
                <div className="card-body">
                <h4 className="card-title">Story of My Life</h4>
                <p className="card-text">Walking the dog ca get tiring, but what if...</p>
                <a href="#" className="btn btn-primary">View Review</a>
                </div>
                <div className="card-footer text-muted">
                Reviews: 3
                </div>
              </div>
            </div>
          </div>
        </div>

        );
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
