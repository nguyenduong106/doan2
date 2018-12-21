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
    var {id,tour,user,total,status,cardName,cardNumber,expirationDate,securityCode}= this.props.task;
    status=!status;
    var task={id,tour,user,total,status,cardName,cardNumber,expirationDate,securityCode};
    this.props.onSave(task);
  }
  render(){
    return (
      <tr>
      <td className='text-center'>{this.props.task.id}</td>
      <td className='text-center'>{this.props.task.tour?this.props.task.tour.name:'No Data'}</td>
      <td className='text-center'>{this.props.task.user?this.props.task.user.name:'No Data'}</td>
      <td className='text-center'><span className={this.props.task.status?'label label-success':'label label-danger'} 
      onClick={()=>this.onUpdateStatus(this.props.task.id)}>
      {this.props.task.status?'Đã Thanh Toán':'Chưa Thanh Toán'}
      </span></td>
      <td className='text-center'>{this.props.task.cardName}</td>
      <td className='text-center'>{this.props.task.cardNumber}</td>
      <td className='text-center'>{this.props.task.expirationDate}</td>
      <td className='text-center'>{this.props.task.securityCode}</td>      
      <td className="text-center">
        <button type="button" className="btn btn-warning" onClick={()=>this.onUpdate()}>
        <span className="fa fa-pencil mr-5"></span>
        Sửa</button>&nbsp;
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
    },
    fetchAllTasks : () =>{
      dispatch(actions.actFetchTasksRequest());
    }
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(TaskItem);
