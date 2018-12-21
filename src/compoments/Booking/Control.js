import React, { Component } from 'react';
import * as actions from './../../actions/Booking/index';
import { connect } from 'react-redux';

class Control extends Component {
  constructor(props){
    super(props);
    this.state={
      searchQuery: "",
      searchSTT: "",
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
  changeState=()=>{
    var stt=document.getElementById("searchSTT").value;
    this.setState({
      searchSTT: stt,
    })
  }
  onSearch=()=>{
    this.props.search(this.state.searchQuery,this.state.searchSTT);
  }
  render(){ 
    return (
      <div className="row mt-15">
        {/* Search */}
        <input type="text" name="searchQuery" className="form-control ml-25" value={this.state.searchQuery} onChange={this.onChange} style={{width:'95%'}}/>
        <div><span className="ml-25 mt-15"/>Tìm Kiếm:<select id="searchSTT" className="form-control ml-25" onChange={this.changeState} style={{width:'95%'}}>
                        <option value={""}>Tất Cả</option>
                        <option value={0}>Chưa Thanh Toán</option>
                        <option value={1}>Thanh Toán</option>
                </select></div>
        <button type="button" className="btn btn-primary ml-25 mt-15" onClick={()=>{this.onSearch()}}><span className="fa fa-search mr-5"/>Tìm Kiếm</button>
      </div>
    );
  }
}

const mapStateToProps = state =>{
};

const mapDispatchToProps= (dispatch,props) =>{
  return {
    search: (query,status) =>{
      dispatch(actions.search(query,status));
    },
  };
};
export default connect(mapStateToProps,mapDispatchToProps)(Control);
