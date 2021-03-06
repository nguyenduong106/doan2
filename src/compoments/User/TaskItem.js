import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './../../actions/Booking/index';

class TaskItem extends Component {
  onDelete=(id)=>{
    // this.props.onDeleteTask(this.props.task.id);
    if(confirm('Bạn chắc chắn muốn xóa ?')){//eslint-disable-line
        this.props.onDelete(id);
    }
    this.props.onCloseForm()
  }
  onUpdate=(id)=>{
    this.props.onOpenForm();
    this.props.onEditTask(this.props.task);
    //this.props.onUpdate(id);
  }
  onUpdateStatus=()=>{
    //this.props.onUpdateStatus(this.props.task.id);
    var {id,createdAt,updateAt,address,birthDate,email,gender,name,password,phone,username}= this.props.task;
    var task={id,createdAt,updateAt,address,birthDate,email,gender,name,password,phone,username};
    this.props.onSave(task);
  }
  render(){ 
    return (
      <tr>
      <td className='text-center'>{this.props.task.id}</td>
      <td className='text-center'>{this.props.task.username}</td>
      <td className='text-center'>{this.props.task.address}</td>
      <td className='text-center'>{this.props.task.birthDate}</td>
      <td className='text-center'>{this.props.task.email}</td>
      <td className='text-center'>{this.props.task.gender}</td>
      <td className='text-center'>{this.props.task.name}</td>
      <td className='text-center'>{this.props.task.phone}</td> 
      <td className="text-center">
        {/* <button type="button" className="btn btn-warning" onClick={()=>this.onUpdate()}>
        <span className="fa fa-pencil mr-5"></span>
        Sửa</button>&nbsp; */}  
        <button type="button" className="btn btn-danger" onClick={()=>this.onDelete(this.props.task.id)}>
        <span className="fa fa-trash mr-5"></span>
        Xóa</button>
      </td>
    </tr>
    );
  }
}

const mapStateToProps = state =>{
  return {};
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
    onSave : (task) =>{
      dispatch(actions.saveTasksRequest(task));
    }
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(TaskItem);
