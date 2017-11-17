export default class Item{
  constructor(title,done){
    this.title=title;
    this.done=done;
    this.timestamp=new Date().getMilliseconds();
  }
}
