import React from 'react';
import ReactDOM from 'react-dom';
import fetch from 'isomorphic-fetch';
import { AppBar, Paper, RaisedButton } from 'material-ui';
import { Table, TableBody, TableHeader,
		TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

//	Test JSON objects
import PageList from '../jsonObj/PageList';
import PageContent from '../jsonObj/PageContent';

//	Components
import Mapbox from '../components/mapbox';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js';

//	Action Handlers
import { fetchPageLinks, fetchPageContent } from '../actions/fetchWikiData.js';

const style = {
	alignContent: 'center',
	alignText: 'center',
	padding: 20,
	margin: 50,
}

class App extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			linkArray: [],
			data: null,
			map: null,
		}
		this.fetchPageLinks = this.fetchPageLinks.bind(this);
		this.fetchPageContent = this.fetchPageContent.bind(this);
		this.addSource = this.addSource.bind(this);
		this.removeSource = this.removeSource.bind(this);
	}

	componentWillMount(){

	}

	componentDidMount(){
		//this.setState({map:props.map});
		//this.fetchPageContent("List_of_terrorist_incidents_in_1970");
		this.fetchPageLinks();
	}
	componentWillUnmount(){

	}

	fetchPageLinks(){
		fetchPageLinks().then((res) => {
			this.setState({linkArray: res});				
		});
    }

    fetchPageContent(){
    	var pageTitle = this.state.linkArray[0];	// Just using the first title
    	console.log("Page Title: " + pageTitle);
    	// Remove Whitespace in Title -> replace spaces with underscores
    	while (pageTitle.includes(" "))
    		pageTitle = pageTitle.replace(" ", "_");	
    	
		fetchPageContent(pageTitle);
		// .then((res) => {
		// 	console.log(res[0]);				
		// });		    

    }

    addSource(){
    	// add to map
    	this.map.addSource('some id', {
		   type: 'video',
		   url: [
		       'https://www.mapbox.com/blog/assets/baltimore-smoke.mp4',
		       'https://www.mapbox.com/blog/assets/baltimore-smoke.webm'
		   ],
		   coordinates: [
		       [-76.54, 39.18],
		       [-76.52, 39.18],
		       [-76.52, 39.17],
		       [-76.54, 39.17]
		   ]
		});
		// update
		var mySource = this.map.getSource('some id');
		mySource.setCoordinates([
		    [-76.54335737228394, 39.18579907229748],
		    [-76.52803659439087, 39.1838364847587],
		    [-76.5295386314392, 39.17683392507606],
		    [-76.54520273208618, 39.17876344106642]
		]);
    }

    removeSource(){
		this.map.removeSource('some id');  // remove
    }

	render(){

		return (
			<div>
				<AppBar title="Project Requiem" showMenuIconButton={false}/>

				<Mapbox />

				<Paper style={style}>
					<RaisedButton 
						onClick={this.fetchPageLinks}
						primary={true}
						label="Fetch Page Links"
						/>

					<RaisedButton 
						onClick={this.fetchPageContent}
						primary={false}
						label="Fetch Page Data"
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