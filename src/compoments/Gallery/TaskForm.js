import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './../../actions/Gallery/index';
import axios from 'axios';
import * as Config from './../../constatns/Config';

class TaskForm extends Component {
  constructor(props){
    super(props);
    this.state = {
        id: "",
        picture: "",
        location: "",
        pictureP: null,
        tasksL: []
    }
  }
  componentWillMount(){
    if(this.props.itemEditing!==null){
    this.setState({
        id: this.props.itemEditing.id,
        picture: this.props.itemEditing.picture,
        location: this.props.itemEditing.location
        });
    }else{
      this.onClear();
    }
  }
  componentWillReceiveProps(nextProps){
    if(nextProps && nextProps.itemEditing){
    this.setState({
        id: nextProps.itemEditing.id,
        picture: nextProps.itemEditing.picture,
        location: nextProps.itemEditing.location
    });
    }else if(nextProps.itemEditing===null){
      this.setState({
        id: "",
        picture: "",
        location: "",
    });
    }
  }
  componentDidMount(){
    axios({
      method: 'GET',
      url: `${Config.API_URL}/location`,
      data: null
    }).then(res =>{
      this.setState({
        tasksL: res.data
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
    var {id,pictureP,location}= this.state;
    var locationId=location.id;
    var task;
    let data= new FormData();
    data.append('file', pictureP);
    data.append('name', pictureP);
    task={id,data,locationId};
    if(locationId==undefined){
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
  onChangeP= event=>{
    console.log(event.target.files[0]);
    this.setState({
      pictureP: event.target.files[0]
    })
  }
  renderOption=()=>{
    var {tasksL}= this.state;
    var rs= null;
    rs = tasksL.map((data,index)=>{
      return(
        <option value={data.id} key={index}>{data.id}:{data.name}</option>
      );
    });
    return rs;
  }
  changeState=()=>{
    var rs=document.getElementById("location");
    var {tasksL}= this.state;
    tasksL.map((data,index)=>{
      if(data.id==rs.value){
        this.setState({
          location: data,
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
              <h3 className="panel-title">{id!==""?"Cập Nhập Gallery":"Thêm Gallery"}
                  <span className="fa fa-times-circle text-right"
                    onClick={this.props.onCloseForm}></span>  
              </h3>
            </div>
            <div className="panel-body">
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <label>Picture:</label>
                  {/* <input type="text" className="form-control" name="picture" value={this.state.picture}
                    onChange={this.onChange}/> */}
                    <input type="file" onChange={this.onChangeP}/>
                </div>
                <div className="form-group">
                  <label>Location:</label>
                  {/* <input type="text" className="form-control" name="location" value={this.state.location}
                    onChange={this.onChange}/> */}
                  <select className="form-combobox" id="location" value={this.state.location.id} onChange={()=>{this.changeState()}}>
                      <option value={0}>Chọn Location</option>
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
    isDisplayForm: state.isDisplayFormG,
    itemEditing: state.itemEditingG
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
