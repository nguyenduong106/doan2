import React, { Component } from 'react';
import * as actions from './../../actions/Category/index';
import { connect } from 'react-redux';

class Control extends Component {
  constructor(props){
    super(props);
    this.state={
      searchQuery: "",
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
  onSearch=()=>{
    this.props.search(this.state.searchQuery);
  }
  render(){ 
    return (
      <div className="row mt-15">
        {/* Search */}
        <input type="text" name="searchQuery" className="form-control form-control ml-25" value={this.state.searchQuery} onChange={this.onChange} style={{width:'95%'}}/>&nbsp;
        <button type="button" className="btn btn-primary ml-25 mt-15" onClick={()=>{this.onSearch()}}><span className="fa fa-search mr-5"/>Tìm Kiếm</button>
      </div>
    );
  }
}

const mapStateToProps = state =>{
};

const mapDispatchToProps= (dispatch,props) =>{
  return {
    search: (query) =>{
      dispatch(actions.search(query));
    },
  };
};
export default connect(mapStateToProps,mapDispatchToProps)(Control);
