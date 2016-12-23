import React from 'react';
import ReactDOM from 'react-dom';
import fetchWikiData from '../actions/fetchWikiData.js';
import fetch from 'isomorphic-fetch';
import { AppBar, Paper, RaisedButton } from 'material-ui';
import { Table, TableBody, TableHeader,
		TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import PageList from '../jsonObj/PageList';
import PageContent from '../jsonObj/PageContent';

//	Components
import Mabbox from '../components/mapbox';

const style = {
	alignContent: 'center',
	alignText: 'center',
	padding: 20,
	margin: 50,
}

class App extends React.Component {

	constructor(){
		super();
		this.state = {
			linkArray: [],
			data: ""
		}
		this.fetchPageLinks = this.fetchPageLinks.bind(this)
		this.fetchPageContent = this.fetchPageContent.bind(this)
	}

	componentWillMount(){

	}

	componentDidMount(){
		this.fetchPageContent("List_of_terrorist_incidents_in_1970");
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
				mode: "no-cors"		// TODO: remove no-cors after hosting
			})
	      	.then((res) => {
	      		console.log(res);
	      		res = PageList 		// TODO: REMOVE THIS WHEN HOSTED ON CLOUD

	      		var pageLinks = [];
	      		// Check response for the Page Links we're interested in -> "List of terrorist incidents"
	      		res.query.pages["17584796"].links.map( (link) => {
	      			var target = "List of terrorist incidents in";
	      			var exclude = "Template";
	      			if( link.title.indexOf(target) !== -1 &&		// indexOf() returns -1 if the target string is not found
	      				link.title.indexOf(exclude) == -1 )		// exclude substring "Template"
	      				pageLinks.push(link.title);
	      		})
		        this.setState({linkArray: pageLinks})

		       //  if (res.ok) {
			      //   this.setState({data:res.json()});
		      	// }else{
			      //   this.setState({data:"Fetch Error"});
		      	// }
	      	});
    }

    fetchPageContent(pageTitle){
    	var url = 'https://en.wikipedia.org/w/api.php?action=query&format=json&prop=revisions&rvprop=content&titles=';
    	// TODO: 
    	url = url + pageTitle;
		return fetch(url, 
			{
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
				},
				mode: "no-cors"		// TODO: remove no-cors after hosting
			})
	      	.then((res) => {
				//  if (res.ok) {
			      //   this.setState({data:res.json()});
		      	// }else{
			      //   this.setState({data:"Fetch Error"});
		      	// }

	      		//console.log(res);
	      		res = PageContent;	// TODO: REMOVE THIS WHEN HOSTED ON CLOUD
	      		//console.log(res);
		    	var content = PageContent.parse.text["*"];

		    	// Create an HTML object & insert page html into it's innerHTML
		    	var doc = document.createElement('div');
		    	doc.innerHTML = content;

		    	// Get all Table elements in doc & iterate over 
		    	var tables = doc.getElementsByClassName("wikitable");
		    	for ( var i = 0; i < tables.length; i++){
		    		console.log(tables[i]);
		    	}
		    	



	      	});



    	// Get Page
    	// // Get Table
    	// var start = content.indexOf("<table");
    	// var table = content.slice(start);
    	// start = table.indexOf(">");
    	// var end = table.indexOf("</table>");
    	// table = table.slice(start + 1, end);
    	// // Get Row
    	// start = table.indexOf("<tr");
    	// var row = table.slice(start);
    	// start = row.indexOf(">");
    	// end = row.indexOf("</tr>");
    	// var row = row.slice(start + 1, end);
    	// // Get th
    	// start = table.indexOf(">");
    	// end = table.indexOf("</tr>");
    	// row = row.slice(0,row.indexOf("\n"));
    	// console.log(tables);
    }

	render(){
		return (
			<div>
				<AppBar title="Terror Map" showMenuIconButton={false}/>

				<Mabbox />

				<Paper style={style}>
					<RaisedButton 
						onClick={this.fetchPageLinks}
						primary={true}
						label="Fetch Data"
						/>
					<Table>
						<TableBody>
						{	// For each Page Link create a new Row
							this.state.linkArray.map((link, index) => (
								<TableRow  key={index} striped={true}>
									<TableRowColumn>{link}</TableRowColumn>
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