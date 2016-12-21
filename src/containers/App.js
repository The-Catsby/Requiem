import React from 'react';
import ReactDOM from 'react-dom';
import fetchWikiData from '../actions/fetchWikiData.js';
import fetch from 'isomorphic-fetch';
import { AppBar } from 'material-ui';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import jsonObj from '../jsonObj';

class App extends React.Component {

	constructor(){
		super();
		this.state = {
			linkArray: [],
			data: JSON.stringify(jsonObj)
		}
		this.fetchPageLinks = this.fetchPageLinks.bind(this)
	}

	componentWillMount(){

	}

	componentDidMount(){

	}
	componentWillUnmount(){

	}

	fetchPageLinks(){
		// Page ID: (17584796) Title: (Template:Lists of Terrorist Incidents)
		// Get list of links from Wikipedia Page
		return fetch('https://en.wikipedia.org/w/api.php?action=query&format=json&pageids=17584796&prop=links&pllimit=500', 
			{
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
				},
				mode: "no-cors"
			})
	      	.then((res) => {
		        console.log(jsonObj.query.pages["17584796"].links)

		       //  if (res.ok) {
			      //   this.setState({data:res.json()});
		      	// }else{
			      //   this.setState({data:"Fetch Error"});
		      	// }
	      	});
    }

	render(){
		return (
			<div>
				<AppBar title="Terror Map" showMenuIconButton={false}/>
				<h1>Terror Map</h1>
				<button onClick={this.fetchPageLinks}> Fetch Data</button>
				<p>{this.state.data} </p>

			</div>
		);
	}
}

export default App;