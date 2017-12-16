class ReviewBox extends React.Component {

    constructor() {
        super();

        this.state = {
            reviews: [],
            editMode: false,
            logout: false,
            auth: true,
            message: ""
        }
    }

    componentWillMount() {

        $.ajax({
            type: "GET",
            url: "/api/review",
            headers: {
                "Authorization": sessionStorage.getItem("token")
            }
        }).done((reviews, status, xhr) => {
            this.setState({ reviews });
            console.log(reviews);
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
                <Redirect to="/review/new" />
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
                <div>
                    <ReviewList reviews={this.state.reviews} />
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

class ReviewList extends React.Component {

    render() {
        let reviews = this._getReviews();

        return(
            reviews.map((review) =>
                    <ReviewCard
                        key={review._id}
                        reviewId={review._id}
                        user={review.user}
                        title={review.title}
                        description={review.description}
                        comment={review.comment}
                        createdOn={review.createdOn} />
                )
        );
    }

    _getReviews() {
        return this.props.reviews;
    }
}

class ReviewCard extends React.Component {

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
                <Redirect to={`/reviews/${this.state.edit}`} />
            );
        }

        if(this.state.refresh) {
            return (
                <Redirect to="/" />
            );
        }

        return(
                    <div className="card">
                    <div className="alert alert-danger invisible" role="alert">
                          {this.state.message}
                    </div>
                        <div className="card-body">
                            <h6 className="card-subtitle mb-2 text-muted">Movie Title</h6>
                            <h4 className="card-title">{this.props.title}</h4>
                            <h6 className="card-subtitle mb-2 text-muted">Description</h6>
                            <p className="card-text">{this.props.description}</p>
                            <h6 className="card-subtitle mb-2 text-muted">Review</h6>
                            <p className="card-text">{this.props.comment}</p>
                            <h6 className="card-subtitle mb-2 text-muted">Author</h6>
                            <p className="card-text">{this.props.user}</p>
                            <h6 className="card-subtitle mb-2 text-muted">Created On</h6>
                            <p className="card-text">{this.props.createdOn}</p>
                            <ManageButton reviewId={this.props.reviewId} action={this._handleEdit.bind(this)} text="Edit" />
                            <ManageButton reviewId={this.props.reviewId} action={this._handleDelete.bind(this)} text="Delete" />
                        </div>
                    </div>

        );
    }

    _handleEdit(reviewId) {
        console.log(reviewId);
        if(this.props.user == sessionStorage.getItem("username")){
          this.setState({
              edit: reviewId
          });
        }
        else{
          this.setState({
              message: "Created by a different user! Cannot edit or delete!"
          });

          let errorAlert = $(".alert");
          if(errorAlert.hasClass("invisible")) {
              errorAlert.removeClass("invisible");
          }
        }
    }

    _handleDelete(reviewId) {
        console.log(reviewId);
        if(this.props.user == sessionStorage.getItem("username")){
          $.ajax({
              type: "DELETE",
              url: `/api/review/${reviewId}`,
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
        else{
          this.setState({
              message: "Created by a different user! Cannot edit or delete!"
          });

          let errorAlert = $(".alert");
          if(errorAlert.hasClass("invisible")) {
              errorAlert.removeClass("invisible");
          }
        }
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
        this.props.action(this.props.reviewId);
    }

}
