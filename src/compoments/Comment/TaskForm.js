import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './../../actions/Comment/index';
import axios from 'axios';
import * as Config from './../../constatns/Config';

class TaskForm extends Component {
  constructor(props){
    super(props);
    this.state = {
        id: "",
        commentDetail: "",
        tour: "",
        user:""
    }
  }
  componentWillMount(){
    if(this.props.itemEditing!==null){
    this.setState({
        id: this.props.itemEditing.id,
        commentDetail: this.props.itemEditing.commentDetail,
        tour: this.props.itemEditing.tour,
        user: this.props.itemEditing.user,
        });
    }else{
      this.onClear();
    }
  }
  componentWillReceiveProps(nextProps){
    if(nextProps && nextProps.itemEditing){
    this.setState({
        id: nextProps.itemEditing.id,
        commentDetail: nextProps.itemEditing.commentDetail,
        tour: nextProps.itemEditing.tour,
        user: nextProps.itemEditing.user,
    });
    }else if(nextProps.itemEditing===null){
      this.setState({
        id: "",
        commentDetail: "",
        tour: "",
        user:""
    });
    }
  }
  componentDidMount(){
    axios({
      method: 'GET',
      url: `${Config.API_URL}/tour`,
      data: null
    }).then(res =>{
      this.setState({
        tasksT: res.data
      })
    }).catch(err =>{
      console.log(err);
    });
    axios({
      method: 'GET',
      url: `${Config.API_URL}/customer`,
      data: null
    }).then(res =>{
      this.setState({
        tasksU: res.data
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
    var {id,commentDetail,tour,user}= this.state;
    var task={id,commentDetail,tour,user};
    if(commentDetail=="" || tour=="" || user==""){
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
  renderOptionT=()=>{
    var {tasksT}= this.state;
    var rs= null;
    rs = tasksT.map((data,index)=>{
      return(
        <option value={data.id} key={index}>{data.id}:{data.name}</option>
      );
    });
    return rs;
  }
  renderOptionU=()=>{
    var {tasksU}= this.state;
    var rs= null;
    rs = tasksU.map((data,index)=>{
      return(
        <option value={data.id} key={index}>{data.id}:{data.name}</option>
      );
    });
    return rs;
  }
  changeStateT=()=>{
    var rs=document.getElementById("tour");
    var {tasksT}= this.state;
    tasksT.map((data,index)=>{
      if(data.id==rs.value){
        this.setState({
          tour: data,
        });
      }
    });
  }
  changeStateU=()=>{
    var rs=document.getElementById("user");
    var {tasksU}= this.state;
    tasksU.map((data,index)=>{
      if(data.id==rs.value){
        this.setState({
          user: data,
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
              <h3 className="panel-title">{id!==""?"Cập Nhập Comment":"Thêm Comment"}
                  <span className="fa fa-times-circle text-right"
                    onClick={this.props.onCloseForm}></span>  
              </h3>
            </div>
            <div className="panel-body">
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <label>CommentDetail:</label>
                  <input type="text" className="form-control" name="commentDetail" value={this.state.commentDetail}
                    onChange={this.onChange}/>
                </div>
                <div className="form-group">
                  <label>Tour:</label>
                  {/* <input type="text" className="form-control" name="tour" value={this.state.tour}
                    onChange={this.onChange}/> */}
                    <select className="form-combobox" id="tour" value={this.state.tour.id} onChange={()=>{this.changeStateT()}}>
                    <option value={0}>Chọn Tour</option>
                      {this.renderOptionT()}
                    </select>
                </div>
                <div className="form-group">
                  <label>User:</label>
                  {/* <input type="text" className="form-control" name="user" value={this.state.user}
                    onChange={this.onChange}/> */}
                    <select className="form-combobox" id="user" value={this.state.user.id} onChange={()=>{this.changeStateU()}}>
                      <option value={0}>Chọn User</option>
                      {this.renderOptionU()}
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
