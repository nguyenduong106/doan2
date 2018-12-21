import React, { Component } from 'react';
import "./App.css";
import * as actions from './actions/Gallery/index';
import { connect } from 'react-redux';

class PictureL extends Component {

    constructor(props){
        super(props);
        this.state={
            slideIndex: 1,
        }
    }

    showPictures= (menus) =>{
            return(
                <div className="mySlides1 fade1">
                        <div className="numbertext">1</div>
                        <img src={`data:image/png;base64,`+menus} style={this.styles1} alt=""/>
                </div>
            );
    }

    componentDidMount(){
        this.showSlides(this.state.slideIndex);
    }
      
    showSlides=(n)=>{
        var i;
        var slides = document.getElementsByClassName("mySlides1");
        if (n > slides.length) {this.state.slideIndex = 1}    
        if (n < 1) {this.state.slideIndex = slides.length}
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "block";
        }
    }

    styles1 = {
        width: '100%',
        height: '490px'
    };
    styles2 = {
        textAlign: 'center'
    };
    render(){
        return (
          <div>
              <div className="slideshow1-container1">
                    {this.showPictures(this.props.tasks)}
                </div>
          </div>    
        );
      }
}

const mapStateToProps = state =>{
    return {
        tasks: state.tasks1G
    };
  };
  
  const mapDispatchToProps = (dispatch, props) => {
    return {
      onPictureTask: (id) =>{
        dispatch(actions.actFetchTasksRequestId(id));
      }
    };
  };
  
  export default connect(mapStateToProps,mapDispatchToProps)(PictureL);