import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './../../actions/Location/index';
import axios from 'axios';
import * as Config from './../../constatns/Config';

class TaskForm extends Component {
  constructor(props){
    super(props);
    this.state = {
        id: "",
        description: "",
        name: "",
        provider: "",
        tasksP: []
    }
  }
  componentWillMount(){
    if(this.props.itemEditing!==null){
    this.setState({
        id: this.props.itemEditing.id,
        description: this.props.itemEditing.description,
        name: this.props.itemEditing.name,
        provider: this.props.itemEditing.provider
        });
    }else{
      this.onClear();
    }
  }
  componentWillReceiveProps(nextProps){
    if(nextProps && nextProps.itemEditing){
    this.setState({
        id: nextProps.itemEditing.id,
        description: nextProps.itemEditing.description,
        name: nextProps.itemEditing.name,
        provider: nextProps.itemEditing.provider
    });
    }else if(nextProps.itemEditing===null){
      this.setState({
        id: "",
        description: "",
        name: "",
        provider: ""
    });
    }
  }
  componentDidMount(){
    axios({
      method: 'GET',
      url: `${Config.API_URL}/provider`,
      data: null
    }).then(res =>{
      this.setState({
        tasksP: res.data
      })
    }).catch(err =>{
      console.log(err);
    });
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
    var {id,description,name,provider}= this.state;
    var task={id,description,name,provider};
    if(description=="" || name=="" || provider==""){
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
  renderOption=()=>{
    var {tasksP}= this.state;
    var rs= null;
    rs = tasksP.map((data,index)=>{
      return(
        <option value={data.id} key={index}>{data.id}:{data.name}</option>
      );
    });
    return rs;
  }
  changeState=()=>{
    var rs=document.getElementById("provider");
    var {tasksP}= this.state;
    console.log(tasksP);
    tasksP.map((data,index)=>{
      if(data.id==rs.value){
        this.setState({
          provider: data,
        });
      }
    });
  }
  render(){
    if(!this.props.isDisplayForm) return ''; 
    var {id}= this.state;
    return (
      <div className="panel panel-warning">
            <div className="panel-heading">
              <h3 className="panel-title">{id!==""?"Cập Nhập Location":"Thêm Location"}
                  <span className="fa fa-times-circle text-right"
                    onClick={this.props.onCloseForm}></span>  
              </h3>
            </div>
            <div className="panel-body">
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <label>Description:</label>
                  <input type="text" className="form-control" name="description" value={this.state.description}
                    onChange={this.onChange}/>
                </div>
                <div className="form-group">
                  <label>Name:</label>
                  <input type="text" className="form-control" name="name" value={this.state.name}
                    onChange={this.onChange}/>
                </div>
                <div className="form-group">
                  <label>Provider:</label>
                  {/* <input type="text" className="form-control" name="provider" value={this.state.provider}
                    onChange={this.onChange}/> */}
                    <select className="form-combobox" id="provider" value={this.state.provider.id} onChange={()=>{this.changeState()}}>
                      <option value={0}>Chọn Provider</option>
                      {this.renderOption()}
                    </select>
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
