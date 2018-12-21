import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './../../actions/Gallery/index';
import { Link } from 'react-router-dom';

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
    console.log(this.props.task);
    this.props.onEditTask(this.props.task);
  }
  onPicture=(id)=>{
    this.props.onPictureTask(id);
  }
  render(){ 
    return (
      <tr>
      <td className='text-center'>{this.props.task.id}</td>
      {/* <td className='text-center'><img id="ItemPreview" src={`data:image/png;base64,`+this.props.task.picture} className="thumbnail"></img></td> */}
      <td className='text-center'><Link to="/PictureP" onClick={()=>this.onPicture(this.props.task.id)}>Xem Ảnh</Link></td>
      <td className='text-center'>{this.props.task.location?this.props.task.location.name:'No Data'}</td>      
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
    onPictureTask: (id) =>{
      dispatch(actions.actFetchTasksRequestId(id));
    }
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(TaskItem);
