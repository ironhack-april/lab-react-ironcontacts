import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import contacts from './contacts.json'

class App extends Component {

  state = {
    contacts,
    contactList:contacts.splice(0,5)
  }

  showContacts = () => {
    let copyContactList = this.state.contactList.map((eachContact, i)=>{
      return (
          <li key={i}>
            <img src={eachContact.pictureUrl} width={`${eachContact.popularity}px`}/>
            {eachContact.name}
            <br></br>
            <i>{eachContact.popularity}</i>
            <button onClick={(e) => this.removeContact(i)} style={{width:'100%'}}>Remove</button>
            <hr></hr>

            <br></br>
            <br></br>
          </li>
      )
    })
    return copyContactList
  }

  addContact = () => {
    let contacts = this.state.contacts
    let randomContact = contacts.splice(Math.floor( Math.random()*contacts.length + 1),1)[0]
    let newContactList = [...this.state.contactList]
    newContactList.push(randomContact)
    this.setState({
      contactList:newContactList
    })

  }

  removeContact = (j) => {
    console.log('remove ',j)
    let newContactList = [...this.state.contactList]
    newContactList.splice(j,1)
    this.setState({
      contactList:newContactList
    })
  }

  sortContacts = (e) => {
    let newContactList = [...this.state.contactList]
    let key = e.target.name
    newContactList.sort(function(a, b){
      if(a[key] < b[key]) { return 1; }
      if(a[key] > b[key]) { return -1; }
      return 0;
    })

    this.setState({
      contactList:newContactList
    })
  }

  filterContacts = (e) => {
    let newContactList = this.state.contactList.filter((eachContact,i)=>{
      console.log(eachContact)
      return eachContact.name.includes(e.target.value)
    })
    this.setState({
      contactList:newContactList
    })
  }

  render() {
    return (
      <div className="App">
        <input type='text' onChange={this.filterContacts} ></input>
        {/* <button onClick={() => this.sortContacts('name')}>Sort Contacts By Name</button> 
        <button onClick={() => this.sortContacts('popularity')}>Sort Contacts By Popularity</button>  */}
        <button name="name" onClick={this.sortContacts}>Sort Contacts By Name</button> 
        <button name="popularity" onClick={this.sortContacts}>Sort Contacts By Popularity</button> 

        <button onClick={this.addContact} >Add Contact</button>
        {this.showContacts()}
      </div>
    );
  }
}

export default App;
