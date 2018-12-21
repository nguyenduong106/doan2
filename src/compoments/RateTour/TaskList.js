import React, { Component } from 'react';
import TaskItem from "./TaskItem";
import { connect } from 'react-redux';
import * as actions from './../../actions/RateTour/index';

class TaskList extends Component {

  // constructor(props){
  //   super(props);
  // }

  componentDidMount(){
    this.props.fetchAllTasks();
  }

  componentWillReceiveProps(nextProps){
    //nextProps.fetchAllTasks();
  }

  onDelete= (id) =>{
    this.props.onDelete(id);
  }

  findIndex= (tasks,id)=>{
    var rs=-1;
    tasks.forEach((task,index) => {
      if(task.id===id){
        rs= index;
      }
    });
    return rs;
  }

  onUpdate= (id)=>{
    this.props.onDelete(id);
  }
  render(){
    var {tasks}= this.props;
    var elmTasks= tasks.map((task,index)=>{
      return <TaskItem task={task} index={index} key={index} onDelete={this.onDelete} onUpdate={this.onUpdate}/>
    }); 
    return (
       <div className="row mt-15">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
              <table className="table table-bordered table-hover">
                <thead>
                  <tr>
                    <th className="text-center">ID</th>
                    <th className="text-center">Rate</th>
                    <th className="text-center">Hành Động</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td></td>
                    <td>
                      <select name="filterStatus" className="form-control">
                        <option value={-1}>Tất Cả</option>
                        <option value={0}>Ẩn</option>
                        <option value={+1}>Kích Hoạt</option>
                      </select>
                    </td>
                    <td></td>
                  </tr>
                  { elmTasks }
                </tbody>
              </table>
            </div>
          </div>
    );
  }
}

const mapStateToProps= (state) => {
  return {
      tasks: state.tasksRT
  }
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchAllTasks : () =>{
      dispatch(actions.actFetchTasksRequest());
    },
    onDelete : (id) =>{
      dispatch(actions.deleteTaskRequest(id));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
