import React from 'react';
import ReactDOM from 'react-dom';
import { Paper, RaisedButton } from 'material-ui';
var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');

// Mapbox Public Access Token
const accessToken = 'pk.eyJ1IjoiYWxleHdvbGYiLCJhIjoiY2l3eHF1enBwMDA0ajJwcWg2Z3V2b2IyMCJ9.xb5OVe7D25aszbKy79yTTQ';

const styles = {
	paper: {	
		alignContent: 'center',
		alignText: 'center',
		padding: 10,
		margin: 10,
		width: '90%',
		height: 'auto',
	},
	map: {
		position: 'relative',
		width: "100%",
		height: '500',
	}
}

class Mapbox extends React.Component {

	constructor(){
		super();
	}

	componentDidMount(){
		mapboxgl.accessToken = accessToken;
		var map = new mapboxgl.Map({
		    container: 'map',
		    style: 'mapbox://styles/mapbox/dark-v9'
		});
	}

	render(){
		return (
				<div id='map' style={styles.map}></div>
		);
	}
}

export default Mapbox;