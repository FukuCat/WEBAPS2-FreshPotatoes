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
                <Route exact path="/meeting/new" component={MeetingNewBox} />
                <Route exact path="/homepage/new" component={HomepageBox} />
                <Route exact path="/session/new" component={LoginBox} />
                <Route exact path="/meetings/:meetingId" component={MeetingEditBox} />
                <Route exact path="/" component={ScrumBox} />
            </div>
            </div>
      </Router>

        );
    }
}
const Login = () => <LoginBox />
const Home = () => <ScrumBox />
const MeetingNew = () => <MeetingNewBox />
const MeetingEdit = () => <MeetingEditBox />
const HomepageBox = () => <HomePageBox />

ReactDOM.render(<AppBox />, document.getElementById("root"));
