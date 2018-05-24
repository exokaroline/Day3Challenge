import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import ReactDOM from 'react-dom';
import * as V from 'victory';
import {VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryStack} from 'victory';

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
    /*let newdata = this.state.array.map((entry)=>{
      if(entry.total>20){
        Username:{entry.username}
        ID: {entry.id}
        Commits: {entry.total}
      }
    }
  )*/
  let newdata = [];
  for(let i = 0; i <this.state.array.length; i++){
    if(this.state.array[i].total>200){
      newdata.push(this.state.array[i]);
    }
  }
    return (
       <VictoryChart>
       <VictoryBar data ={newdata}
       x= "username"
       y= "total" /> 
       </VictoryChart>
    );
    }
  }


ReactDOM.render(<App/>, document.getElementById('root'));

export default App;
