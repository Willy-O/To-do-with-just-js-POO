import AddToDo from './components/addToDo.js';
import Modal from './components/modal.js';
import Filters from './components/filters.js';

export default class View{
  constructor(){
    this.model = null;
    this.table = document.getElementById("table");
    this.addToDoForm = new AddToDo();
    this.modal = new Modal()
    this.filters = new Filters()

    this.addToDoForm.onClick((title,description) => this.addToDo(title,description))
    this.modal.onClick((id,values)=> this.editToDo(id,values))
    this.filters.onClick((filters) => this.filter(filters))
  }

  setModel(model){
    this.model = model
  }
  
  render() {
    const toDos = this.model.getToDo();
    for(const toDo of toDos){
      this.createRow(toDo)
    }
  }

  addToDo(title, description){
    const toDo = this.model.addToDo(title, description)
    this.createRow(toDo)
  }

  filter(filters){
    const {type, search} = filters
    const [, ...rows] = this.table.getElementsByTagName('tr')
    for(const row of rows){
      const [title, description, completed] = row.children;
      let shouldHide = false

      if (search){
        shouldHide = !title.innerText.includes(search) && !description.innerText.includes(search)
      }

      const shouldBeCompleted = type === 'completed'
      const isCompleted = completed.children[0].checked

      if (type != all && shouldBeCompleted !== isCompleted) {
        shouldHide = true
      }

      if (shouldHide) {
        row.classList.add('d-none')
      } else {
        row.classList.remove('d-none')
      }
    }
  }

  removeToDo(id){
    this.model.removeToDo(id);
    document.getElementById(id).remove()
  }

  checkCompleted(id){
    this.model.checkCompleted(id)
  }

  editToDo(id, values){
    this.model.editToDo(id, values)
    const row = document.getElementById(id);
    row.children[0].innerHTML = values.title
    row.children[1].innerHTML = values.description
    row.children[2].children[0].checked = values.completed
  }

  createRow(toDo){
    const row = table.insertRow()
    row.setAttribute('id', toDo.id);
    row.innerHTML = `
    <tr>
      <td class="text-light">${toDo.title}</td>
      <td class="text-light">${toDo.description}</td>
      <td class="text-center text-light"></td>
      <td class="text-right text-light"></td>
    </tr>
    `;
    
    const checkbox = document.createElement('input')
    checkbox.type = 'checkbox';
    checkbox.checked = toDo.completed
    checkbox.onclick = () => this.checkCompleted(toDo.id)
    row.children[2].appendChild(checkbox)

    const editBtn = document.createElement("button");
    editBtn.classList.add("btn", "btn-primary", "mb-1");
    editBtn.innerHTML = '<i class="fa fa-edit" data-bs-toggle="modal" data-bs-target="#modal"></i>';
    editBtn.onclick = () => this.modal.setValues(toDo)
    row.children[3].appendChild(editBtn)

    const removeBtn = document.createElement("button");
    removeBtn.classList.add("btn", "btn-danger", "mb-1", "ms-1");
    removeBtn.innerHTML = '<i class="fa fa-trash"></i>';
    removeBtn.onclick = () => this.removeToDo(toDo.id)
    row.children[3].appendChild(removeBtn)
  }
}