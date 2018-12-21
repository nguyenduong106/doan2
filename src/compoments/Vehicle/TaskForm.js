import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './../../actions/Vehicle/index';
import axios from 'axios';
import * as Config from './../../constatns/Config';

class TaskForm extends Component {
  constructor(props){
    super(props);
    this.state = {
        id: "",
        container: "",
        name: "",
        vehicleType: "",
        tasksVt: []
    };
  }
  componentWillMount(){
    if(this.props.itemEditing!==null){
    this.setState({
        id: this.props.itemEditing.id,
        container: this.props.itemEditing.container,
        name: this.props.itemEditing.name,
        vehicleType: this.props.itemEditing.vehicleType
        });
    }else{
      this.onClear();
    }
  }
  componentWillReceiveProps(nextProps){
    if(nextProps && nextProps.itemEditing){
    this.setState({
        id: nextProps.itemEditing.id,
        container: nextProps.itemEditing.container,
        name: nextProps.itemEditing.name,
        vehicleType: nextProps.itemEditing.vehicleType
    });
    }else if(nextProps.itemEditing===null){
      this.setState({
        id: "",
        container: "",
        name: "",
        vehicleType: ""
    });
    }
  }
  componentDidMount(){
    axios({
      method: 'GET',
      url: `${Config.API_URL}/vehicle-type`,
      data: null
    }).then(res =>{
      this.setState({
        tasksVt: res.data
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
    var {id,container,name,vehicleType}= this.state;
    var task={id,container,name,vehicleType};
    if(container=="" || name=="" || vehicleType==""){
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
    var {tasksVt}= this.state;
    var rs= null;
    rs = tasksVt.map((data,index)=>{
      return(
        <option value={data.id} key={index}>{data.id}:{data.name}</option>
      );
    });
    return rs;
  }
  changeState=()=>{
    var rs=document.getElementById("vehicleType");
    var {tasksVt}= this.state;
    tasksVt.map((data,index)=>{
      if(data.id==rs.value){
        this.setState({
          vehicleType: data,
        });
      }
    });
  }
  render(){
    //var {tasksVt}= this.state;
    if(!this.props.isDisplayForm) return ''; 
    var {id}= this.state;
    return (
      <div className="panel panel-warning">
            <div className="panel-heading">
              <h3 className="panel-title">{id!==""?"Cập Nhập Vehicle":"Thêm Vehicle"}
                  <span className="fa fa-times-circle text-right"
                    onClick={this.props.onCloseForm}></span>  
              </h3>
            </div>
            <div className="panel-body">
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <label>Container:</label>
                  <input type="text" className="form-control" name="container" value={this.state.container}
                    onChange={this.onChange}/>
                </div>
                <div className="form-group">
                  <label>name:</label>
                  <input type="text" className="form-control" name="name" value={this.state.name}
                    onChange={this.onChange}/>
                </div>
                <div className="form-group">
                  <label>VehicleType:</label><br/>
                  <select className="form-combobox" id="vehicleType" value={this.state.vehicleType?this.state.vehicleType:'No Data'} onChange={()=>{this.changeState()}}>
                  <option value={0}>Chọn VehicleType</option>
                      {this.renderOption()}
                  </select>
                  {/* <input type="text" className="form-control" name="vehicleType" value={this.state.vehicleType}
                    onChange={this.onChange}/> */}
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
    tasks: state.tasks,
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
    },
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(TaskForm);
