class ScrumBox extends React.Component {

    constructor() {
        super();

        this.state = {
            meetings: [],
            editMode: false,
            logout: false,
            auth: true
        }
    }

    componentWillMount() {

        $.ajax({
            type: "GET",
            url: "/api/meeting",
            headers: {
                "Authorization": sessionStorage.getItem("token")
            }
        }).done((meetings, status, xhr) => {
            this.setState({ meetings });
            console.log(meetings);
        }).fail((xhr) => {
            console.log(xhr.status);

            if(xhr.status == 401) {
                this.setState({
                    auth: false
                });
            }
        });

        if(!sessionStorage.getItem("token")) {
            this.setState({
                auth: false
            });
        }
    }

    render() {
        if(!this.state.auth) {
            return (
                <Redirect to="/session/new" />
            );
        }

        if(this.state.logout) {
            sessionStorage.removeItem("token");
            return (
                <Redirect to="/session/new" />
            );
        }

        if(this.state.editMode) {
            return (
                <Redirect to="/meeting/new" />
            );
        }

        return (
            <div className="container-fluid">
            <div className="row">
                <div className="col-sm">
                <button type="button" onClick={this._logout.bind(this)} className="btn btn-primary btn-lg float-right">
                    Logout
                </button>
                <button type="button" onClick={this._handleClick.bind(this)} className="btn btn-primary btn-lg">
                    +Add New Movie Review
                </button>

                </div>
            </div>
        <div className="row">
            <div className="col-sm">
                <div className="card">
                    <MeetingList meetings={this.state.meetings} />
                </div>
            </div>
        </div>
</div>
        );
    }

    _logout(e){
      e.preventDefault();

      this.setState({
          logout: true
      });

    }

    _handleClick(e) {
        e.preventDefault();

        this.setState({
            editMode: true
        });
    }
}

class MeetingList extends React.Component {

    render() {
        let meetings = this._getMeetings();

        return(
            meetings.map((meeting) =>
                    <MeetingCard
                        key={meeting._id}
                        meetingId={meeting._id}
                        name={meeting.name}
                        yesterday={meeting.yesterday}
                        today={meeting.today}
                        impediment={meeting.impediment}
                        createdOn={meeting.createdOn} />
                )
        );
    }

    _getMeetings() {
        return this.props.meetings;
    }
}

class MeetingCard extends React.Component {

    constructor() {
        super();

        this.state = {
            refresh: false,
            edit: ""
        }
    }

    render() {

        if(this.state.edit != "") {
            return (
                <Redirect to={`/meetings/${this.state.edit}`} />
            );
        }

        if(this.state.refresh) {
            return (
                <Redirect to="/" />
            );
        }

        return(
                    <div className="card">
                        <div className="card-body">
                            <h6 className="card-subtitle mb-2 text-muted">Movie Title</h6>
                            <h4 className="card-title">{this.props.yesterday}</h4>
                            <h6 className="card-subtitle mb-2 text-muted">Description</h6>
                            <p className="card-text">{this.props.today}</p>
                            <h6 className="card-subtitle mb-2 text-muted">Review</h6>
                            <p className="card-text">{this.props.impediment}</p>
                            <h6 className="card-subtitle mb-2 text-muted">Created On</h6>
                            <p className="card-text">{this.props.createdOn}</p>
                            <ManageButton meetingId={this.props.meetingId} action={this._handleEdit.bind(this)} text="Edit" />
                            <ManageButton meetingId={this.props.meetingId} action={this._handleDelete.bind(this)} text="Delete" />
                        </div>
                    </div>
        );
    }

    _handleEdit(meetingId) {
        console.log(meetingId);

        this.setState({
            edit: meetingId
        });
    }

    _handleDelete(meetingId) {
        console.log(meetingId);

        $.ajax({
            type: "DELETE",
            url: `/api/meeting/${meetingId}`,
            headers: {
                "Authorization": sessionStorage.getItem("token")
            }
        }).done((res, status, xhr) => {
            this.setState({
                refresh: true
            });
        }).fail((xhr) => {
            console.log(xhr.status);
        });
    }

}

class ManageButton extends React.Component {

    constructor() {
        super();
    }

    render() {
        return (
            <a href="#" onClick={this._handleEdit.bind(this)} className="card-link">{this.props.text}</a>
        );
    }

    _handleEdit(e) {
        e.preventDefault();
        this.props.action(this.props.meetingId);
    }

}
