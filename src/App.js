var template = require("./app.handlebars");
import Item from './Item';
import './style.css';
export default class App{
	constructor(rootElement){
		this.rootElement=rootElement;
		this.todos=[];
		this.all=[];
		this.completed=[];
		this.showingCompleted=false;
		this.showingAll=true;

	}
	init(){
		this.rootElement.innerHTML = template(
			{
				appTitle:'TODO List',
				todos:this.todos,
				showingAll:this.showingAll,
				showingCompleted:this.showingCompleted
			}
		);
	}
	appName(){
		return 'Chat application'
	}
	wireEvents(){
		let todoInput=document.querySelector('#todo-text');
		todoInput.addEventListener('keydown',evt=>this.addTodo(evt))
		todoInput.focus();
		let doneCheckBoxes=document.getElementsByClassName('check-item');
		if (doneCheckBoxes && doneCheckBoxes.length>0) {
			for(var el of doneCheckBoxes){
				el.addEventListener('change',ev=>this.markDone(ev));
			}
		}
		let showAllCheckbox=document.querySelector('#show-all');
		if(showAllCheckbox){
			showAllCheckbox.addEventListener('change',(e)=>this.showAll(e));
		}

		let showCompletedCheckbox=document.querySelector('#show-completed');
		if(showCompletedCheckbox){
			showCompletedCheckbox.addEventListener('change',(e)=>this.showCompleted(e));
		}
	}
	markDone(e){
		if(!e.target)return;
		let itemTimestamp=e.target.dataset.timestamp;
		this.changeDone(itemTimestamp,e.target.checked);
	}
	render(){
		this.init();
		this.wireEvents();
	}
	showAll(e){
		if(e.target.checked){
			this.todos=this.all.slice();
			this.showingAll=true;
			this.showingCompleted=false;
			this.render();
		}
	}
	showCompleted(e){
		if(e.target.checked){
			this.all=this.todos.slice();
			let completed=this.all.filter((item)=>{return item.done});
			this.todos=completed.slice();
			this.showingCompleted=true;
			this.showingAll=false;
			this.render();

		}

	}

	changeDone(timestamp,done){
		if(!this.todos)return;
		let item=this.todos.find(it=>{
			return it.timestamp==timestamp;
		});
		item.done=done;
		this.render();
	}

	addTodo(e){
		if (e.keyCode===13) {
			let todo=new Item(e.target.value,false);
			this.todos.push(todo);
			e.target.value='';
			this.init();
			this.wireEvents();
		}
	}
}
