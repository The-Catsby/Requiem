import React from 'react';
import ReactDOM from 'react-dom';
import fetchWikiData from '../actions/fetchWikiData.js';
import fetch from 'isomorphic-fetch';
import { AppBar, Paper } from 'material-ui';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';

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
	      		
	      		res = jsonObj // TODO: REMOVE THIS WHEN HOSTED ON CLOUD

	      		var pageLinks = [];
	      		// Check response for the Page Links we're interested in -> "List of terrorist incidents"
	      		res.query.pages["17584796"].links.map( (link) => {
	      			var target = "List of terrorist incidents";
	      			var exclude = "Template";
	      			if( link.title.indexOf(target) !== -1 &&		// indexOf() returns -1 if the target string is not found
	      				link.title.indexOf(exclude) == -1 )		// exclude substring "Template"
	      				pageLinks.push(link);
	      		})
		        this.setState({linkArray: pageLinks})

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
				<Paper>
					<button onClick={this.fetchPageLinks}> Fetch Data</button>
					<Table>
						<TableBody>
						{	// For each Page Link create a new Row
							this.state.linkArray.map((link, index) => (
								<TableRow  key={index} striped={true}>
									<TableRowColumn>{link.title}</TableRowColumn>
								</TableRow>
							))
						}
						</TableBody>
					</Table>
				</Paper>
			</div>
		);
	}
}

export default App;