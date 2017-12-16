class MeetingBox extends React.Component {
  constructor(){
    super();

    this.state = {
      meetings: []
    };
  }

  componentWillMount() {
    this._fetchMeetings();
  }

  render() {
    return (
      <div className="container-fluid">
          <div className="row">
              <div className="col-sm"></div>
              <div className="col-sm" id="col-sm-login">
              <MeetingForm addMeeting={this._addMeeting.bind(this)}/>
              <MeetingList meetings={this.state.meetings}/>
              </div>
              <div className="col-sm"></div>
          </div>
      </div>
    );
  }

  _addMeeting(meeting){
    meeting.id = this.state.meetings.length + 1;
    this.setState({
      meetings: this.state.meetings.concat([meeting])
    });
  }

  _fetchMeetings(){

    $.ajax({
      url: "/api/meeting",
      method: "GET",
      headers: {
        "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoidGVzdCIsImFjY2VzcyI6Im1lZXRpbmdfY3JlYXRlLG1lZXRpbmdfZWRpdCxtZWV0aW5nX3ZpZXciLCJpYXQiOjE1MTI3MDQyMDgsImV4cCI6MTUxMjcwNTY0OH0.M7dWtUyixLoTqyyTJA1nW1ce50amZe_rgc6cdBHexDg",
        "Content-Type": "application/json"
      },
      success: (meetings) => {
        this.setState({
          meetings
        });
      }
    });

  }

}

class MeetingList extends React.Component{
  render() {
    let meetings = this._getMeetings();

    return(
      <div>
      <ul className="list-group">
        {meetings.map((meeting) =>
          <Meeting
            key={meeting.id}
            name={meeting.name}
            password={meeting.password}/>
          )}
      </ul>
      </div>
    );
  }

  _getMeetings() {
    return this.props.meetings;
  }
}

class MeetingForm extends React.Component {

  constructor(){
    super();

    this.state = {
      message: ""
    }
  }

  render(){
    return(
      <form action="#">
          <div className="form-group">
              <label htmlFor="name">User ID</label>
              <input type="text" className="form-control" id="name" placeholder="Enter user ID"/>
          </div>
          <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" className="form-control" id="password" placeholder="Password"/>
          </div>
          <button type="submit" className="btn btn-primary" onClick={this._handleClick.bind(this)}>Submit</button>
      </form>
    );
  }

  _handleClick(e){
    e.preventDefault();
    let meeting = {
      name: this._name.value,
      password: this._password.value
    }
    this.props.addMeeting(meeting);
    this.setState({
      message: `Item added ${this._name.value}`
    });
  }

}

class Meeting extends React.Component{
  render() {
    return(
      <li className="list-group-item">
      <h2>{this.props.name}</h2>
      <h3>{this.props.project}</h3>
      </li>
    );
  }
}

ReactDOM.render(<MeetingBox />, document.getElementById("root"));
