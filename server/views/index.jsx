import React,{Component} from 'react';

export default class Index extends Component {
	
	render(){

		   return(
		      <html>
		      <head>
		        <meta charSet="utf-8"></meta>
		        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"></meta>
		        <title>React-Hapi App</title>
		      </head>
		      <body style={{fontFamily: ['Varela Round', 'sans-serif']}}>
		        <div id="app"></div>
		        <script src="/bundle.js"></script>
		      </body>
		      </html>
    		);
	}
}