import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor(props) { 
    super(props); 
    this.state = {array: []}; 
  }

  componentDidMount( ) { 
    axios.get("https://api.github.com/repos/facebook/react/stats/contributors")
    .then (response => { 
       const results = response.data;
       var contributors = []; 
       var i; 
       for (i=0; i<results.length; i++) { 
         var entry = {
           username: results[i].author.login,
           id: results[i].author.id, 
           total: results[i].total
         }
        contributors.push(entry);
       }
       this.setState({
          array: contributors
       });
    })
  }
  

  render() {
    const listy = (
      <ul> {this.state.array.map((rest) =>
        <li key={rest.id} > 
          <h1> Username: {rest.username} </h1>
          <h2> ID: {rest.id} </h2>
          <h3> Commits: {rest.total} </h3>
      </li>
    )}
      </ul>
      );

    return (
        <div>{listy}</div>
    );
    }
  }


//ReactDOM.render(<App/>, document.getElementById('root'));

export default App;
