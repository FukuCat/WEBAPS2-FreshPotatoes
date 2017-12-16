class ReviewEditBox extends React.Component {

    constructor() {
        super();

        this.state = {
            review: {},
            auth: true,
            done: false
        }
    }

    componentWillMount() {
        let reviewId = this.props.match.params.reviewId;

        this._fetchReview(reviewId);
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
                                        <textarea onChange={this._handleTitleChange.bind(this)} value={this.state.review.title} ref={(textarea) => this._title = textarea} className="form-control" id="yesterday" rows="3"></textarea>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="today">Description</label>
                                        <textarea onChange={this._handleDescriptionChange.bind(this)} value={this.state.review.description} ref={(textarea) => this._description = textarea} className="form-control" id="today" rows="3"></textarea>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="impediment">Review</label>
                                        <textarea onChange={this._handleCommentChange.bind(this)} value={this.state.review.comment} ref={(textarea) => this._comment = textarea} className="form-control" id="impediment" rows="3"></textarea>
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

    _handleTitleChange(e) {
        let review = this.state.review;

        this.setState({
            review: Object.assign({}, review,
                {
                    title: e.target.value
                })
        });
    }

    _handleDescriptionChange(e) {
        let review = this.state.review;

        this.setState({
            review: Object.assign({}, review,
                {
                    description: e.target.value
                })
        });
    }

    _handleCommentChange(e) {
        let review = this.state.review;

        this.setState({
            review: Object.assign({}, review,
                {
                    comment: e.target.value
                })
        });
    }

    _fetchReview(reviewId) {
        $.ajax({
            type: "GET",
            url: `/api/review/${reviewId}`,
            headers: {
                "Authorization": sessionStorage.getItem("token")
            }
        }).done((review, status, xhr) => {
            console.log(review);
            this.setState({
                review
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

        let reviewId = this.props.match.params.reviewId;

        let review = {
            title: this._title.value,
            description: this._description.value,
            comment: this._comment.value
        }

        $.ajax({
            type: "PUT",
            url: `/api/review/${reviewId}`,
            headers: {
                "Authorization": sessionStorage.getItem("token")
            },
            data: review
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

        console.log(review);

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

class ReviewNewBox extends React.Component {

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
                                        <input type="text" ref={(input) => this._title = input} className="form-control" id="title" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="yesterday">Description</label>
                                        <textarea ref={(textarea) => this._description = textarea} className="form-control" id="description" rows="3"></textarea>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="today">Review</label>
                                        <textarea ref={(textarea) => this._comment = textarea} className="form-control" id="comment" rows="3"></textarea>
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

        let review = {
            user: sessionStorage.getItem("username"),
            title: this._title.value,
            description: this._description.value,
            comment: this._comment.value
        }

        $.ajax({
            type: "POST",
            url: "/api/review",
            headers: {
                "Authorization": sessionStorage.getItem("token")
            },
            data: review
        }).done((review, status, xhr) => {
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
