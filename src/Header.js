import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';

const menus= [
  {
    name: 'Booking',
    to: '/Booking',
    exact: false
  },
  {
    name: 'Category',
    to: '/Category',
    exact: false
  },
  {
    name: 'Comment',
    to: '/Comment',
    exact: false
  },
  {
    name: 'Gallery',
    to: '/Gallery',
    exact: false
  },
  {
    name: 'Location',
    to: '/Location',
    exact: false
  },
  {
    name: 'Provider',
    to: '/Provider',
    exact: false
  },
  {
    name: 'Rate',
    to: '/Rate',
    exact: false
  },
  {
    name: 'Rate-Type',
    to: '/RateType',
    exact: false
  },
  {
    name: 'Tour',
    to: '/Tour',
    exact: false
  },
  {
    name: 'User',
    to: '/User',
    exact: false
  },
  {
    name: 'Vehicle',
    to: '/Vehicle',
    exact: false
  },
  {
    name: 'Vehicle-Type',
    to: '/VehicleType',
    exact: false
  }
];

const menus1= [];

const MenuLink= ({label, to ,activeOnlyWhenExact}) =>{
  return(
    <Route 
      path={to}
      exact={activeOnlyWhenExact}
      children={(match)=>{
        var active = match ? 'active' : '';
        return (
          <li className= {active}>
              <Link to={to}>
                {label}
              </Link>
          </li>
        );
      }}
    />
  );
};

class Header extends Component {

  render(){
    return (
      <div>
        <nav className="navbar navbar-default">
          <a className="navbar-brand" href="/Login">Admin</a>
          <ul className="nav navbar-nav">
          {    console.log(this.props.isAdmin)
}
            {this.props.isAdmin?this.showMenus(menus):this.showMenus(menus1)}
          </ul>
        </nav>
      </div>
    );
  }
  showMenus= (menus) =>{
    var rs= null;
    if(menus.length > 0){
      rs = menus.map((menu,index)=>{
        return(
          <MenuLink 
            key={index}
            label={menu.name}
            to={menu.to}
            activeOnlyWhenExact={menu.activeOnlyWhenExact}
          />
        );
      });
    }
    return rs;
  }
}

const mapStateToProps = state =>{
  return {
    isAdmin: state.auth.isAdmin
  };
};

export default connect(mapStateToProps,null)(Header);
