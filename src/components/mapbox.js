import React from 'react';
import ReactDOM from 'react-dom';
import { Paper, RaisedButton } from 'material-ui';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js';
import { connect } from 'react-redux';

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
		height: 600,
	}
}

class Mapbox extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			map: null
		}
		this.addSource = this.addSource.bind(this);
		this.removeSource = this.removeSource.bind(this);
	}

	componentDidMount(){
		mapboxgl.accessToken = accessToken;
		var map = new mapboxgl.Map({
		    container: 'map',
		    style: 'mapbox://styles/mapbox/dark-v9'
		});
		this.setState({map:map});
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
				<div id='map' style={styles.map}></div>
									<RaisedButton 
						onClick={this.addSource}
						primary={true}
						label="Add Source"
						/>
					<RaisedButton 
						onClick={this.removeSource}
						primary={true}
						label="Remove Source"
						/>

			</div>
		);
	}
}

function mapStateToProps(state) {
    return {
        map: state.map
    }
};

export default connect(mapStateToProps)(Mapbox);