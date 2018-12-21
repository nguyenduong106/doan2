import React, { Component } from 'react';
import "./App.css";
import TaskForm from "./compoments/Hotel/TaskForm";
import TaskList from "./compoments/Hotel/TaskList";
import { connect } from 'react-redux';
import  * as actions from './actions/Hotel/index';

class Hotel extends Component {

  constructor(props){
    super(props);
    this.state={
    }
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
	    address: "",
	    name: "",
	    phone: "",
	    provider_id: ""
    });
  }
  onOpenForm=()=>{
    this.setState({
      isDisplayForm: true
    })
  }
  render(){
    var { isDisplayForm } = this.props;
    return (
      <div className="container">
        <div className="text-center">
            <h1>Quản Lý Hotel</h1><hr/>
        </div>
        <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
          {/*form*/}
          <TaskForm/>
        </div>
        <div className={ isDisplayForm? "col-xs-8 col-sm-8 col-md-8 col-lg-8" : "col-xs-12 col-sm-12 col-md-12 col-lg-12" }>
          <button type="button" className="btn btn-primary"
            onClick={this.onToglleForm}>
          <span className="fa fa-plus mr-5"></span>
          Thêm Hotel</button>
          {/* Search - Sort */}
          <div className="row mt-15">
          {/* Search <Control/>*/}
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
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(Hotel);
