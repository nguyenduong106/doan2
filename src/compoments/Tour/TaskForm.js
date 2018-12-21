import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './../../actions/Tour/index';
import axios from 'axios';
import * as Config from './../../constatns/Config';

class TaskForm extends Component {
  constructor(props){
    super(props);
    this.state = {
        id: "",
        freeSpace: "",
        maximumPeople: "",
        name: "",
        price: "",
        vehicle: "",
        category: "",
        fromDate: "",
        to_Date: "",
        status: "",
        tasksV: [],
        tasksC: []
    }
  }
  componentWillMount(){
    if(this.props.itemEditing!==null){
    this.setState({
        id: this.props.itemEditing.id,
        freeSpace: this.props.itemEditing.freeSpace,
        maximumPeople: this.props.itemEditing.maximumPeople,
        name: this.props.itemEditing.name,
        price: this.props.itemEditing.price,
        vehicle: this.props.itemEditing.vehicle,
        category: this.props.itemEditing.category,
        fromDate: this.props.itemEditing.fromDate,
        toDate: this.props.itemEditing.toDate,
        status: this.props.itemEditing.status
        });
    }else{
      this.onClear();
    }
  }
  componentWillReceiveProps(nextProps){
    if(nextProps && nextProps.itemEditing){
    this.setState({
        id: nextProps.itemEditing.id,
        freeSpace: nextProps.itemEditing.freeSpace,
        maximumPeople: nextProps.itemEditing.maximumPeople,
        name: nextProps.itemEditing.name,
        price: nextProps.itemEditing.price,
        vehicle: nextProps.itemEditing.vehicle,
        category: nextProps.itemEditing.category,
        fromDate: nextProps.itemEditing.fromDate,
        toDate: nextProps.itemEditing.toDate,
        status: nextProps.itemEditing.status
    });
    }else if(nextProps.itemEditing===null){
      this.setState({
        id: "",
        freeSpace: "",
        maximumPeople: "",
        name: "",
        price: "",
        vehicle: "",
        category: "",
        fromDate: "",
        toDate: "",
        status: ""
    });
    }
  }
  componentDidMount(){
    axios({
      method: 'GET',
      url: `${Config.API_URL}/vehicle`,
      data: null
    }).then(res =>{
      this.setState({
        tasksV: res.data
      })
    }).catch(err =>{
      console.log(err);
    });
    axios({
      method: 'GET',
      url: `${Config.API_URL}/category`,
      data: null
    }).then(res =>{
      this.setState({
        tasksC: res.data
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
    var {id,freeSpace,maximumPeople,name,price,vehicle,category,fromDate,toDate,status}= this.state;
    var task={id,freeSpace,maximumPeople,name,price,vehicle,category,fromDate,toDate,status};
    if(freeSpace=="" || maximumPeople=="" || name=="" || price=="" || vehicle=="" || category=="" || fromDate=="" || toDate==""){
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
  renderOptionC=()=>{
    var {tasksC}= this.state;
    var rs= null;
    rs = tasksC.map((data,index)=>{
      return(
        <option value={data.id} key={index}>{data.id}:{data.name}</option>
      );
    });
    return rs;
  }
  renderOptionV=()=>{
    var {tasksV}= this.state;
    var rs= null;
    rs = tasksV.map((data,index)=>{
      return(
        <option value={data.id} key={index}>{data.id}:{data.name}</option>
      );
    });
    return rs;
  }
  changeStateC=()=>{
    var rs=document.getElementById("category");
    var {tasksC}= this.state;
    tasksC.map((data,index)=>{
      if(data.id==rs.value){
        this.setState({
          category: data,
        });
      }
    });
  }
  changeStateV=()=>{
    var rs=document.getElementById("vehicle");
    var {tasksV}= this.state;
    tasksV.map((data,index)=>{
      if(data.id==rs.value){
        this.setState({
          vehicle: data,
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
              <h3 className="panel-title">{id!==""?"Cập Nhập Tour":"Thêm Tour"}
                  <span className="fa fa-times-circle text-right"
                    onClick={this.props.onCloseForm}></span>  
              </h3>
            </div>
            <div className="panel-body">
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <label>Free Space:</label>
                  <input type="text" className="form-control" name="freeSpace" value={this.state.freeSpace}
                    onChange={this.onChange}/>
                </div>
                <div className="form-group">
                  <label>Maximum People:</label>
                  <input type="text" className="form-control" name="maximumPeople" value={this.state.maximumPeople}
                    onChange={this.onChange}/>
                </div>
                <div className="form-group">
                  <label>Name:</label>
                  <input type="text" className="form-control" name="name" value={this.state.name}
                    onChange={this.onChange}/>
                </div>
                {/* <div className="form-group">
                  <label>Locations:</label>
                  <input type="text" className="form-control" name="locations" value={this.state.locations}
                    onChange={this.onChange}/>
                </div> */}
                <div className="form-group">
                  <label>Price:</label>
                  <input type="text" className="form-control" name="price" value={this.state.price}
                    onChange={this.onChange}/>
                </div>
                <div className="form-group">
                  <label>Vehicle:</label>
                  {/* <input type="text" className="form-control" name="vehicle" value={this.state.vehicle}
                    onChange={this.onChange}/> */}
                    <select className="form-combobox" id="vehicle" value={this.state.vehicle.id} onChange={()=>{this.changeStateV()}}>
                    <option value={0}>Chọn Vehicle</option>
                      {this.renderOptionV()}
                    </select>
                </div>
                <div className="form-group">
                  <label>Category:</label>
                  {/* <input type="text" className="form-control" name="category" value={this.state.category}
                    onChange={this.onChange}/> */}
                    <select className="form-combobox" id="category" value={this.state.category.id} onChange={()=>{this.changeStateC()}}>
                    <option value={0}>Chọn Category</option>
                      {this.renderOptionC()}
                  </select>
                </div>
                <div className="form-group">
                  <label>From_Date:</label>
                  <input type="text" className="form-control" name="fromDate" value={this.state.fromDate}
                    onChange={this.onChange}/>
                </div>
                <div className="form-group">
                  <label>To_Date:</label>
                  <input type="text" className="form-control" name="toDate" value={this.state.toDate}
                    onChange={this.onChange}/>
                </div>
                {/* <div className="form-group">
                  <label>Picutre:</label>
                  <input type="text" className="form-control" name="picutre" value={this.state.picutre}
                    onChange={this.onChange}/>
                </div><br/> */}
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
