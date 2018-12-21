import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './../../actions/User/index';

class TaskForm extends Component {
  constructor(props){
    super(props);
    this.state = {
        id: "",
        address: "",
        birthDate: "",
        email: "",
        gender: "",
        name: "",
        password: "",
        phone: "",
        username: ""
    }
  }
  componentWillMount(){
    if(this.props.itemEditing!==null){
    this.setState({
        id: this.props.itemEditing.id,
        address: this.props.itemEditing.address,
        birthDate: this.props.itemEditing.birthDate,
        email: this.props.itemEditing.email,
        gender: this.props.itemEditing.gender,
        name: this.props.itemEditing.name,
        password: this.props.itemEditing.password,
        phone: this.props.itemEditing.phone,
        username: this.props.itemEditing.username
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
        birthDate: nextProps.itemEditing.birthDate,
        email: nextProps.itemEditing.email,
        gender: nextProps.itemEditing.gender,
        name: nextProps.itemEditing.name,
        password: nextProps.itemEditing.password,
        phone: nextProps.itemEditing.phone,
        username: nextProps.itemEditing.username
    });
    }else if(nextProps.itemEditing===null){
      this.setState({
        id: "",
        address: "",
        birthDate: "",
        email: "",
        gender: "",
        name: "",
        password: "",
        phone: "",
        username: ""
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
  onUpdate=(event)=>{
    event.preventDefault();
    var {id,address,birthDate,email,gender,name,password,phone,username}= this.state;
    var task={id,address,birthDate,email,gender,name,password,phone,username};
    if(address=="" || name=="" || birthDate=="" || email=="" || gender=="" || phone=="" ||username==""){
      alert("Vui lòng kiểm tra lại các trường thông tin!!!!") 
    }else{
      this.props.onSave(task);
      this.onClear();
      this.props.onCloseForm()
    }
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
              <h3 className="panel-title">{id!==""?"Cập Nhập User":"Thêm User"}
                  <span className="fa fa-times-circle text-right"
                    onClick={this.props.onCloseForm}></span>  
              </h3>
            </div>
            <div className="panel-body">
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <label>Username:</label>
                  <input type="text" className="form-control" name="username" value={this.state.username}
                    onChange={this.onChange}/>
                </div>
                <div className="form-group">
                  <label>Address:</label>
                  <input type="text" className="form-control" name="address" value={this.state.address}
                    onChange={this.onChange}/>
                </div>
                <div className="form-group">
                  <label>BirthDate:</label>
                  <input type="text" className="form-control" name="birthDate" value={this.state.birthDate}
                    onChange={this.onChange}/>
                </div>
                <div className="form-group">
                  <label>Email:</label>
                  <input type="text" className="form-control" name="email" value={this.state.email}
                    onChange={this.onChange}/>
                </div>
                <div className="form-group">
                  <label>Gender:</label>
                  <input type="text" className="form-control" name="gender" value={this.state.gender}
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
                </div><br/>
                <button type="submit" className="btn btn-success" onClick={this.onUpdate}>
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
