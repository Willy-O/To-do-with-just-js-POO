class Model {
  constructor(){
    this.view = null;
    this.toDo = JSON.parse(localStorage.getItem('toDo'));
    if(!this.toDo || this.toDo.length < 1){
      this.toDo = [
        {
          id: 0,
          title: 'Some title',
          description: 'Some description',
          completed: false,
        }
      ]
      this.currentId = 1;
    } else {
      this.currentId = this.toDo[this.toDo.length -1].id + 1;
    }
  }

  setView(view){
    this.view = view;
  }

  getToDo(){
    return this.toDo;
  }

  findToDo(id){
    return this.toDo.findIndex((toDo) => toDo.id === +id);
  }
  
  addToDo(title, description){
    const toDo = {
      id: this.currentId++,
      title,
      description,
      completed: false
    }
    this.toDo.push(toDo)
    
    this.save()
    return {...toDo}
     // Object.assign({}, toDo); asigna a un objeto vacio las propiedades de toDo == clone de toDo
  }
  
  editToDo(id, values){
    const index = this.findToDo(id)
    Object.assign(this.toDo[index], values)
    this.save()
  }

  removeToDo(id){
    const index = this.findToDo(id)
    this.toDo.splice(index, 1);
    this.save()
  }

  checkCompleted(id){
    const index = this.findToDo(id);
    const toDo = this.toDo[index];
    toDo.completed = !toDo.completed;
    this.save()
  }

  save(){
    localStorage.setItem('toDo', JSON.stringify(this.toDo))
  }
}

export default Model