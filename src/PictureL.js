import React, { Component } from 'react';
import "./App.css";
import * as actions from './actions/Location/index';
import { connect } from 'react-redux';

class PictureL extends Component {

    constructor(props){
        super(props);
        this.state={
            slideIndex: 1,
        }
    }

    showPictures= (menus) =>{
        var rs= null;
        if(menus.length > 0){
          rs = menus.map((menu,index)=>{
            return(
                <div className="mySlides1 fade1">
                        <div className="numbertext">{index+1}</div>
                        <img src={`data:image/png;base64,`+menu} style={this.styles1} alt=""/>
                </div>
            );
          });
        }
        return rs;
    }

    componentDidMount(){
        this.showSlides(this.state.slideIndex);
    }
    plusSlides=(n)=> {
        this.showSlides(this.state.slideIndex += n);
    }
      
    currentSlide=(n)=> {
        this.showSlides(this.state.slideIndex = n);
    }
      
    showSlides=(n)=>{
        var i;
        var slides = document.getElementsByClassName("mySlides1");
        var dots = document.getElementsByClassName("dot");
        if (n > slides.length) {this.state.slideIndex = 1}    
        if (n < 1) {this.state.slideIndex = slides.length}
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }
        if(this.props.tasks.length>0){
            slides[this.state.slideIndex-1].style.display = "block";  
            dots[this.state.slideIndex-1].className += " active";
        }
    }

    showDots= (menus) =>{
        var rs= null;
        if(menus.length > 0){
          rs = menus.map((menu,index)=>{
            return(
                <span className="dot" onClick={()=>this.currentSlide(index+1)}></span> 
            );
          });
        }
        return rs;
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
                    <a className="prev" onClick={()=>this.plusSlides(-1)}>&#10094;</a>
                    <a className="next" onClick={()=>this.plusSlides(1)}>&#10095;</a>
                </div>
                <br/>
                <div style={this.styles2}>
                    {this.showDots(this.props.tasks)}
                </div>
          </div>    
        );
      }
}

const mapStateToProps = state =>{
    return {
        tasks: state.tasks1L
    };
  };
  
  const mapDispatchToProps = (dispatch, props) => {
    return {
      onDeleteTask : (id) =>{
        dispatch(actions.deleteTask(id))
      },
      onCloseForm: () =>{
        dispatch(actions.closeForm())
      },
      onOpenForm: () =>{
        dispatch(actions.openForm());
      },
      onEditTask: (task) =>{
        dispatch(actions.editTask(task));
      },
      onPictureTask: (id) =>{
        dispatch(actions.actFetchTasksRequestId(id));
      }
    };
  };
  
  export default connect(mapStateToProps,mapDispatchToProps)(PictureL);