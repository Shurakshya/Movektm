import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchSingleApartment, addComment} from "./action";

import './detail.css'
import DetailHeader from "./components/DetailHeader";
import EachApartment from './components/EachApartment';
import AddComment from "./components/AddComment";

class Detail extends Component {
  constructor(props){
    super(props);
    this.state={
      updated : false,
      showMessage : false
    }
  }
  componentDidMount() {
    const id = this.props.match.params.apartmentId;
    this.props.fetchSingleApartment(id);
  }
  submitComment=(data)=>{
    const id = this.props.match.params.apartmentId;
    this.props.addComment(id, data);
    this.setState({
      showMessage : false
    })
  }
  componentWillReceiveProps(newProps){
    const { commentSuccess } = newProps.detail;
    if(commentSuccess!==this.props.detail.commentSuccess && commentSuccess === true){
      this.setState({
        updated : true,
        showMessage:true
      });
    }
  }

  render() {
    const {apartment, comment , commentError} = this.props.detail;
    console.log(this.props.detail.commentSuccess);
    return (
      <div>
        <DetailHeader/>
        <div className={"container-fluid detail-container-fluid"}>
          <div className={"detail-wrapper"}>
            {this.state.showMessage ?
              (
                <div className="feedBack-success">
                  <strong>Success!!!</strong> Thank You For Your Feedback.
                </div>
              ) : null }
            <EachApartment singleApartment={apartment}/>
            <p>{commentError ? 'error' : null}</p>
            <AddComment onSubmit={this.submitComment} comment={comment} commentError={commentError} />
            <h1>{this.state.updated ? 'success' : null}</h1>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({detail}) => {
  return {
    detail
  }

}

export default connect(mapStateToProps, {fetchSingleApartment, addComment})(Detail);