import Alert from "./alert.js";

class Modal{
  constructor() {
    this.alert = new Alert('modal-alert')
    this.title = document.getElementById('modal-title')
    this.modal = document.getElementById('modal')
    this.description = document.getElementById('modal-description')
    this.btnSave = document.getElementById('modal-btn-save')
    this.completed = document.getElementById('modal-completed')
    this.toDo = null
  }

  setValues(toDo){
    this.toDo = toDo
    this.title.value = toDo.title;
    this.description.value = toDo.description;
    this.completed.checked = toDo.completed;
  }

  onClick(callback){
    this.btnSave.onclick = () => {
      if (!this.title.value || !this.description.value) {
        this.alert.show('Title and description are required')
        return
      }
      callback(this.toDo.id, {
        title: this.title.value,
        description: this.description.value,
        completed: this.completed.checked
      }) 
      const modal = bootstrap.Modal.getInstance(this.modal)
      modal.toggle()
    }
  }
}

export default Modal