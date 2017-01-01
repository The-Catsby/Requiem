//	Test JSON objects
import PageList from '../jsonObj/PageList';
import PageContent from '../jsonObj/PageContent';

//	Wikipedia API URL
const BASE_URL = 'https://en.wikipedia.org/w/api.php?';

/******		Wiki API Request	*****/
export function fetchWikiData(params){
	var url = BASE_URL;
	for (var i = 0; i < params.length; i++){
		url += params[i] + "&";
	}
	console.log("Fetch: " + url);
	return fetch(url, 
		{
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			mode: "no-cors"		// TODO: remove no-cors after hosting
		});
}

export function fetchPageLinks(){
	// Page ID: (17584796) Title: (Template:Lists of Terrorist Incidents)
	// Get list of links from Wikipedia Page
	var params = [
		'pageids=17584796',
		'action=query',
		'format=json',
		'prop=links',
		'pllimit=500',
	];

	return fetchWikiData(params)
		.then((res) => 
		{
			//console.log(res);

      		// TODO: REMOVE THIS WHEN HOSTED ON CLOUD
      		res = PageList 		

      		var pageLinks = [];
      		// Check response for the Page Links we're interested in -> "List of terrorist incidents"
      		res.query.pages["17584796"].links.map( (link) => {
      			var target = "List of terrorist incidents in";
      			var exclude = "Template";
      			if( link.title.indexOf(target) !== -1 &&		// indexOf() returns -1 if the target string is not found
      				link.title.indexOf(exclude) == -1 )		// exclude substring "Template"
      				pageLinks.push(link.title);
      		})
			//this.setState({linkArray: pageLinks});			
			return pageLinks;	
		});
} 

export function fetchPageContent(pageTitle){

	var params = [
    	'action=parse',
    	'format=json',
    	'prop=text',
    	'page=' + pageTitle,
	];

	return fetchWikiData(params)
		.then( (res) => {
	  		//console.log(res);
	  		res = PageContent;	// TODO: REMOVE THIS WHEN HOSTED ON CLOUD
	  		//console.log(res);
	    	var content = res.parse.text["*"];

	    	// Create an HTML object & insert page html into it's innerHTML
	    	var doc = document.createElement('div');
	    	doc.innerHTML = content;


	    	// Get all Table elements in doc & iterate over 
	    	var tables = doc.getElementsByClassName("wikitable");
	    	for ( var i = 0; i < tables.length; i++){
	    		console.log(tables[i]);
				
				//	Get all row elements in table	    		
	    		var rows = tables[i].getElementsByTagName("tr");
	    		console.log(rows);

	    		var numRow = rows.length;
	    		var numCol = rows[0].childElementCount;

	    		var result = [];
	    		var header = [];
	    		console.log("numRow: " + numRow);
	    		console.log("numCol: " + numCol);

	    		//	For each Row
	    		for(var j=0; j < numRow; j++){
	    			let obj = {};
    				// For each cell
	    			for(var k=0; k < numCol; k++){	
	    				var cell = rows[j].children[k].textContent;
	    				// Get first row header info
	    				if(j==0){
	    					header[k] = cell;
	    				}
	    				else{
	    					obj[header[k]] = cell;
	    				}
	    			}
	    			//Save info; skip first row of table
	    			if(j>0)
	    				result[j-1] = obj;
	    		}

	    		console.log(header);
	    		console.log(result);
	    		
	    	} 
	    	
	    	// return tables;   			
		});

}