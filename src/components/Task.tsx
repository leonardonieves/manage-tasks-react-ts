import { useState } from 'react'
import TaskM from '../helpers/TaskM';
import Modal from 'react-bootstrap/Modal';
import { Button, Form } from 'react-bootstrap';

type Props = {
  tasks: TaskM[];
  completeTask: (id: number) => TaskM;
  deleteTask: (id: number) => void;
  updateTask: (id: number, name: string) => TaskM;
}
const Task: React.FC<Props> = ({ tasks, completeTask, deleteTask, updateTask }) => {

  const [edit, setEdit] = useState({} as TaskM);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [validation, setValidation] = useState('');

  const submitUpdate = (name: string) => {
    updateTask(edit.id, name);
    setEdit({
      id: 0,
      name: '',
      state: false
    });
    setValidation('');
    setModalIsOpen(false);
  }


  const handleSubmit = (event: any) => {
    if (event) event.preventDefault();
    const field = event.target.querySelector('input');
    if (input == "" || input == undefined) {
      field.classList.add('is-invalid');
    }
    else {
      setValidation('was-validated');
      submitUpdate(field.value);
    }
  };

  const handleChange = (e: any) => {
    const field = e.target;
    if (field.classList.contains('is-invalid')) {
      field.classList.remove('is-invalid');
    }
    setInput(field.value);
  }

  const OpenModalEdit = (id: number, name: string, state: boolean) => {
    setInput(name);
    setEdit({ id: id, name: name, state: state })
    setModalIsOpen(true);
  }
  return (
    <>
      {tasks.map((task: TaskM, index: number) => (
        <div className={task.state ? 'row task complete ' : 'row task'} key={index}>
          <div key={task.id} className='col-sm-12 col-lg-6 p5'>
            {task.name}
          </div>
          <div className='col-sm-12 col-lg-6'>
            <button className='btn btn-danger manage-task' onClick={() => deleteTask(task.id)} disabled={task.state}>Delete</button>
            <button className='btn btn-warning manage-task' onClick={() => OpenModalEdit(task.id, task.name, task.state)} disabled={task.state}>Edit</button>
            <button className='btn btn-success manage-task' onClick={() => completeTask(task.id)} disabled={task.state}>Complete</button>
          </div>
        </div>
      ))
      }
      <Modal show={modalIsOpen} onHide={() => setModalIsOpen(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form id="form-edit" name="form-edit" onSubmit={handleSubmit} className={validation}>
            <input
              type='text'
              placeholder="Update task"
              name='text'
              value={input}
              className="task-input form-control"
              onChange={handleChange}
            />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setModalIsOpen(false)}>
            Cancel
          </Button>
          <Button type="submit" form="form-edit" variant="primary">
            Update Task
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Task