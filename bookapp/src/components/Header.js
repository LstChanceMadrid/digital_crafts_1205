import React, { Component } from 'react';
import axios from 'axios'
import {button, Navbutton} from 'react-router-dom'
import { connect } from 'react-redux'
import history from '../history';

class Header extends Component {
     constructor(props){
       super(props)
      this.state = {
        ...this.state,
        isAuthenticated : false
      }
     }

     logout = () => {
       localStorage.clear()

      this.props.notAuthenticate()
history.push('/login')

     }
     selectedGenre = (e) =>{
       this.props.genre(e.target.value)
       console.log(this.props.genre(e.target.value))
     }

componentDidMount = () => {
  if (localStorage.jsonwebtoken) {
    return this.setState({
      ...this.state,
      isAuthenticated : true
    })
  }
}


render() {
  if(this.state.isAuthenticated === true){
    return (

      <nav className="navbar navbar-light bg-dark justify-content-between text-white">
        <button onClick={this.selectedGenre} value="allbooks" className="navbar-brand">My Library</button>
        <button onClick={this.selectedGenre} value="Romance" className="navbar-brand category">Romance</button>
        <button onClick={this.selectedGenre} value="Fiction" className="navbar-brand category">Fiction</button>
        <button onClick={this.selectedGenre} value="Technical" className="navbar-brand category">Technical</button>
        <button onClick={this.selectedGenre} value="Biography" className="navbar-brand category">Biography</button>
        <form className="form-inline">
          <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
          <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>

        </form>
        <button onClick={this.logout} className="btn btn-warning">Logout</button>
      </nav>

    )
  } else {
    return (
      <div>
      </div>
    )
  }

}
}
// map global state to local props
const mapStateToProps = (state) => {
  return {

    isAuthenticated : state.isAuthenticated //this.props.isAuthenticated
    //ctr: state.counter // this.props.ctr
  }
}

// make the dispatches available on local props
// dispatch is used to communicate with the reducer
// so the reducer can change the global state
const mapDispatchToProps = (dispatch) => {
  return {
    // this.props.onIncrementCounter
   notAuthenticate: () => dispatch({type: "NOTAUTHENTICATED"}),
   genre: (value) => dispatch({type: "GENRE", genre: value }),
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(Header)
