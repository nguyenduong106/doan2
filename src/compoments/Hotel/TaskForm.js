import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './../../actions/Hotel/index';

class TaskForm extends Component {
  constructor(props){
    super(props);
    this.state = {
        id: "",
        address: "",
        name: "",
        phone: "",
        provider_id: ""
    }
  }
  componentWillMount(){
    if(this.props.itemEditing!==null){
    this.setState({
        id: this.props.itemEditing.id,
        address: this.props.itemEditing.address,
        name: this.props.itemEditing.name,
        phone: this.props.itemEditing.phone,
        provider_id: this.props.itemEditing.provider_id,
        });
    }else{
      this.onClear();
    }
  }
  componentWillReceiveProps(nextProps){
    if(nextProps && nextProps.itemEditing){
    this.setState({
        id: nextProps.itemEditing.id,
        address: nextProps.itemEditing.address,
        name: nextProps.itemEditing.name,
        phone: nextProps.itemEditing.phone,
        provider_id: nextProps.itemEditing.provider_id,
    });
    }else if(nextProps.itemEditing===null){
      this.setState({
        id: "",
        address: "",
        name: "",
        phone: "",
        provider_id: ""
    });
    }
  }
  onChange =(event)=>{
      var target= event.target;
      var name= target.name;
      var value= target.value;
      this.setState({
        [name]: value
      });
  }
  onSubmit=(event)=>{
    event.preventDefault();
    var {id,address,name,phone,provider_id}= this.state;
    var task={id,address,name,phone,provider_id}
    this.props.onSave(task);
    this.onClear();
    this.props.onCloseForm()
    }
  onClear=()=>{
    this.setState({
      name: "",
      status: false
    })
  }
  render(){
    if(!this.props.isDisplayForm) return ''; 
    var {id}= this.state;
    return (
      <div className="panel panel-warning">
            <div className="panel-heading">
              <h3 className="panel-title">{id!==""?"Cập Nhập Hotel":"Thêm Hotel"}
                  <span className="fa fa-times-circle text-right"
                    onClick={this.props.onCloseForm}></span>  
              </h3>
            </div>
            <div className="panel-body">
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <label>Address:</label>
                  <input type="text" className="form-control" name="address" value={this.state.address}
                    onChange={this.onChange}/>
                </div>
                <div className="form-group">
                  <label>Name:</label>
                  <input type="text" className="form-control" name="name" value={this.state.name}
                    onChange={this.onChange}/>
                </div>
                <div className="form-group">
                  <label>Phone:</label>
                  <input type="text" className="form-control" name="phone" value={this.state.phone}
                    onChange={this.onChange}/>
                </div>
                <div className="form-group">
                  <label>Provider_ID:</label>
                  <input type="text" className="form-control" name="provider_id" value={this.state.provider_id}
                    onChange={this.onChange}/>
                </div><br/>
                <button type="submit" className="btn btn-success">
                  <span className="fa fa-plus mr-5"></span>
                  Lưu Lại</button>&nbsp;
                <button type="reset" className="btn btn-danger"
                  onClick={this.onClear}>
                  <span className="fa fa-close mr-5"></span>
                  Hủy Bỏ</button>
              </form>
            </div>
          </div>
    );
  }
}

const mapStateToProps = (state)=>{
  return {
    isDisplayForm: state.isDisplayForm,
    itemEditing: state.itemEditing
  }
};

const mapDispatchToProps= (dispatch,props) => {
  return  {
    onSaveTask: (task) =>{
      dispatch(actions.saveTask(task));
    },
    onCloseForm: () =>{
      dispatch(actions.closeForm());
    },
    onSave : (task) =>{
      dispatch(actions.saveTasksRequest(task));
    },
    fetchAllTasks : () =>{
      dispatch(actions.actFetchTasksRequest());
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(TaskForm);
