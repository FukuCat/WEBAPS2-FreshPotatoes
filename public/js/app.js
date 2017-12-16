const Router = window.ReactRouterDOM.HashRouter;
const Route =  window.ReactRouterDOM.Route;
const Link =  window.ReactRouterDOM.Link;
const Prompt =  window.ReactRouterDOM.Prompt;
const Switch = window.ReactRouterDOM.Switch;
const Redirect = window.ReactRouterDOM.Redirect;
const hashHistory = window.ReactRouterDOM.hashHistory;

class AppBox extends React.Component {

    render() {
        return (
        <Router>
            <div>
            <nav className="navbar navbar-light bg-light justify-content-between">
                <a className="navbar-brand">Movie Review</a>
            </nav>
            <div id="content">
                <Route exact path="/review/new" component={ReviewNewBox} />
                <Route exact path="/session/new" component={LoginBox} />
                <Route exact path="/reviews/:reviewId" component={ReviewEditBox} />
                <Route exact path="/register/new" component={RegisterBox} />
                <Route exact path="/" component={ReviewBox} />
            </div>
            </div>
      </Router>

        );
    }
}
const Login = () => <LoginBox />
const Home = () => <ReviewBox />
const ReviewNew = () => <ReviewNewBox />
const ReviewEdit = () => <ReviewEditBox />

ReactDOM.render(<AppBox />, document.getElementById("root"));
