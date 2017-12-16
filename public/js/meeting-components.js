class MeetingEditBox extends React.Component {

    constructor() {
        super();

        this.state = {
            meeting: {},
            auth: true,
            done: false
        }
    }

    componentWillMount() {
        let meetingId = this.props.match.params.meetingId;

        this._fetchMeeting(meetingId);

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

        if(this.state.done) {
            return (
                <Redirect to="/" />
            );
        }

        return(
        <div className="container-fluid">
            <div className="row">
                <div className="col-sm"></div>
                <div className="col-sm" id="col-sm-meeting">
                            <form onSubmit={this._handleSubmit.bind(this)}>
                                <div className="modal-body">
                                    <div className="form-group">
                                        <label htmlFor="yesterday">Movie Title</label>
                                        <textarea onChange={this._handleYesterdayChange.bind(this)} value={this.state.meeting.yesterday} ref={(textarea) => this._yesterday = textarea} className="form-control" id="yesterday" rows="3"></textarea>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="today">Description</label>
                                        <textarea onChange={this._handleTodayChange.bind(this)} value={this.state.meeting.today} ref={(textarea) => this._today = textarea} className="form-control" id="today" rows="3"></textarea>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="impediment">Year</label>
                                        <textarea onChange={this._handleImpedimentChange.bind(this)} value={this.state.meeting.impediment} ref={(textarea) => this._impediment = textarea} className="form-control" id="impediment" rows="3"></textarea>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" onClick={this._handleClose.bind(this)} className="btn btn-secondary" data-dismiss="modal">Close</button>
                                    <input type="submit" className="btn btn-primary" />
                                </div>
                            </form>
                </div>
                <div className="col-sm"></div>
            </div>
        </div>
        );
    }

    _handleYesterdayChange(e) {
        let meeting = this.state.meeting;

        this.setState({
            meeting: Object.assign({}, meeting,
                {
                    yesterday: e.target.value
                })
        });
    }

    _handleTodayChange(e) {
        let meeting = this.state.meeting;

        this.setState({
            meeting: Object.assign({}, meeting,
                {
                    today: e.target.value
                })
        });
    }

    _handleImpedimentChange(e) {
        let meeting = this.state.meeting;

        this.setState({
            meeting: Object.assign({}, meeting,
                {
                    impediment: e.target.value
                })
        });
    }

    _fetchMeeting(meetingId) {
        $.ajax({
            type: "GET",
            url: `/api/meeting/${meetingId}`,
            headers: {
                "Authorization": sessionStorage.getItem("token")
            }
        }).done((meeting, status, xhr) => {
            console.log(meeting);
            this.setState({
                meeting
            });
        }).fail((xhr) => {
            if(xhr.status == 401)
            {
                this.setState({
                    auth: false
                });
            }
        });
    }

    _handleSubmit(e) {
        e.preventDefault();

        let meetingId = this.props.match.params.meetingId;

        let meeting = {
            yesterday: this._yesterday.value,
            today: this._today.value,
            impediment: this._impediment.value
        }

        $.ajax({
            type: "PUT",
            url: `/api/meeting/${meetingId}`,
            headers: {
                "Authorization": sessionStorage.getItem("token")
            },
            data: meeting
        }).done((data, status, xhr) => {
            this.setState({
                done: true
            });
        }).fail((xhr) => {

            if(xhr.status == 401) {
                this.setState({
                    auth: false
                });
            }
        });

        console.log(meeting);

    }

    _handleClose(e) {
        e.preventDefault();

        this._close();
    }

    _close() {
        this.setState({
            done: true
        });
    }
}

class MeetingNewBox extends React.Component {

    constructor() {
        super();

        this.state = {
            done: false,
            auth: true
        }
    }

    componentWillMount() {
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

        if(this.state.done) {
            return (
                <Redirect to="/" />
            );
        }

        return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-sm"></div>
                <div className="col-sm" id="col-sm-meeting">
                            <form onSubmit={this._handleSubmit.bind(this)}>
                                <div className="modal-body">
                                    <div className="form-group">
                                        <label htmlFor="name">Movie Title</label>
                                        <input type="text" ref={(input) => this._yesterday = input} className="form-control" id="yesterday" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="yesterday">Description</label>
                                        <textarea ref={(textarea) => this._today = textarea} className="form-control" id="today" rows="3"></textarea>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="today">Year</label>
                                        <textarea ref={(textarea) => this._impediment = textarea} className="form-control" id="impediment" rows="3"></textarea>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" onClick={this._handleClose.bind(this)} className="btn btn-secondary" data-dismiss="modal">Close</button>
                                    <input type="submit" className="btn btn-primary" />
                                </div>
                            </form>
                </div>
                <div className="col-sm"></div>
            </div>
        </div>
        );
    }

    _handleClose(e) {
        e.preventDefault(e);

        this._close();
    }

    _handleSubmit(e) {
        e.preventDefault();

        let meeting = {
            name: this._yesterday.value,
            project: this._yesterday.value+" "+this._impediment.value,
            yesterday: this._yesterday.value,
            today: this._today.value,
            impediment: this._impediment.value
        }

        $.ajax({
            type: "POST",
            url: "/api/meeting",
            headers: {
                "Authorization": sessionStorage.getItem("token")
            },
            data: meeting
        }).done((meeting, status, xhr) => {
            this._close();
        }).fail((xhr) => {
            console.log(xhr.status);
        });


    }

    _close() {

        this.setState({
            done: true
        });
    }
}
