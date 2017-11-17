import App from './App';

function start(){
	var element=document.createElement('div');
	var app=new App(element);
	app.init();
	document.body.appendChild(element);
	app.wireEvents();
	return element;
}
start();
