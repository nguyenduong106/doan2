import React, { Component } from 'react';
import "./App.css";
import TaskForm from "./compoments/RateType/TaskForm";
import TaskList from "./compoments/RateType/TaskList";
import Control from "./compoments/RateType/Control";
import { connect } from 'react-redux';
import  * as actions from './actions/RateType/index';

class RateType extends Component {

  constructor(props){
    super(props);
    this.state={
    }
  }
  componentWillMount(){
    this.props.onCloseForm();
  }
  onToglleForm=()=>{
    var {itemEditing } = this.props;
    if(itemEditing && itemEditing.id!==''){
      this.props.onOpenForm();
    }else{
      this.props.onToglleForm(); 
    }
    this.props.onClearTask({
      id: "",
      rate: ""
    });
  }
  onOpenForm=()=>{
    this.setState({
      isDisplayForm: true
    })
  }
  render(){
    //var {taskIndex} = this.state;
    var { isDisplayForm } = this.props;
    return (
      <div className="container">
        <div className="text-center">
            <h1>Quản Lý RateType</h1><hr/>
        </div>
        <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
          {/*form*/}
          <TaskForm/>
        </div>
        <div className={ isDisplayForm? "col-xs-8 col-sm-8 col-md-8 col-lg-8" : "col-xs-12 col-sm-12 col-md-12 col-lg-12" }>
          <button type="button" className="btn btn-primary"
            onClick={this.onToglleForm}>
          <span className="fa fa-plus mr-5"></span>
          Thêm RateType</button>
          {/* Search - Sort */}
          <div className="row mt-15">
           <Control/>
          </div>
        {/*List*/}
          <TaskList/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state =>{
  return {
    isDisplayForm: state.isDisplayForm,
    itemEditing: state.itemEditing
  };
};

const mapDispatchToProps= (dispatch,props) =>{
  return {
    onToglleForm: () =>{
      dispatch(actions.toggleForm())
    },
    onClearTask: (task) =>{
      dispatch(actions.editTask(task));
    },
    onOpenForm: () =>{
      dispatch(actions.openForm());
    },
    onCloseForm: () =>{
      dispatch(actions.closeForm());
    }
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(RateType);
