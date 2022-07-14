import { useState, useEffect } from 'react';
import TaskForm from './TaskForm';
import Task from './Task';
import taskService from '../services/task.service';
import Spinner from './Spinner';
import TaskM from '../helpers/TaskM';
import { IAddTask } from '../request/IAddTask';
import swal from 'sweetalert2';


function TaskList() {
  const [tasks, setTasks] = useState([] as TaskM[]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    taskService.getTasks()
      .then(
        (response) => {
          setTasks(response.data.result);
        },
        (error) => {
          const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
            swal.fire({
              title: "Error",
              text: message,
              position: "top",
              allowOutsideClick: false,
              allowEscapeKey: false,
              allowEnterKey: false,
              showConfirmButton: false,
              showCancelButton: false,
              timer: 2000,
              icon:'error'
            });
            console.log(message);
        }
      )
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const addTask = (task: TaskM) => {
    if (!task.name || /^\s*$/.test(task.name)) {
      return;
    }

    setLoading(true);
    taskService.addTask({ name: task.name })
      .then(
        (response) => {
          const newTasks = [response.data.result, ...tasks];
          setTasks(newTasks);
          swal.fire({
            toast: true,
            title: "Success",
            text: 'Task successfully added',
            position: "top-right",
            allowEscapeKey: false,
            showConfirmButton: false,
            showCancelButton: false,
            timer: 2000,
            icon:'success'
          });
        },
        (error) => {
          const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
            swal.fire('',message,'error')
          console.log(message);
        }
      )
      .finally(() => {
        setLoading(false);
      });
  };

  const completeTask = (id: number) => {
    setLoading(true);
    let t = {} as TaskM;
    taskService.completeTask(id)
      .then(
        (response) => {
          t = response.data.result;
          setTasks(tasks.map(task => (
            task.id === t.id ? t : task
          )));
          swal.fire({
            toast: true,
            title: "Success",
            text: 'Task successfully completed',
            position: "top-right",
            allowEscapeKey: false,
            showConfirmButton: false,
            showCancelButton: false,
            timer: 2000,
            icon:'success'
          });
        },
        (error) => {
          const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
          console.log(message);
          swal.fire('',message,'error')
        }
      )
      .finally(() => {
        setLoading(false);
      });
    return t;
  }

  const updateTask = (id: number, newValue: string) => {

    setLoading(true);
    let t = {} as TaskM;
    taskService.updateTask(id, newValue)
      .then(
        (response) => {
          t = response.data.result;
          setTasks(tasks.map(task => (
            task.id === t.id ? t : task
          )));
          swal.fire({
            toast:true,
            title: "Success",
            text: 'Task successfully updated',
            position: "top-right",
            allowEscapeKey: false,
            showConfirmButton: false,
            showCancelButton: false,
            timer: 2000,
            icon:'success'
          });
        },
        (error) => {
          const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();

          console.log(message);
        })
      .finally(() => {
        setLoading(false);
      });
    return t;
  }

  const deleteTask = (id: number) => {
    swal.fire({
      icon: 'error',
      title:'Warning',
      text: 'Are you sure?',
      position: 'center',
      showDenyButton:true,
      denyButtonText:'No',
      confirmButtonText: 'Yes',

    }).then(response => {
      if(response.isConfirmed) {
        taskService.deleteTask(id)
      .then(
        (response) => {
          const removeList = [...tasks].filter(task => task.id !== id);
          setTasks(removeList);
          swal.fire('','Task successfully deleted','success')
          swal.fire({
            toast: true,
            title: "Success",
            text: 'Task successfully deleted',
            position: "top-right",
            allowEscapeKey: false,
            showConfirmButton: false,
            showCancelButton: false,
            timer: 2000,
            icon:'success'
          });
        },
        (error) => {
          const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
            swal.fire({
              title: "Error",
              text: message,
              position: "top",
              allowOutsideClick: false,
              allowEscapeKey: false,
              allowEnterKey: false,
              showConfirmButton: false,
              showCancelButton: false,
              timer: 2000,
              icon:'error'
            });
          console.log(message);
        }
      )
      .finally(() => {
        setLoading(false);
      });
      }
    });
    
    
  }

  return (
    <>
      {
        loading ? (
          <Spinner />

        )
          :
          (
            <div>
              <h1>Tasks</h1>
              <TaskForm onSubmit={addTask} />
              <Task
                tasks={tasks}
                completeTask={completeTask}
                deleteTask={deleteTask}
                updateTask={updateTask}
              />
            </div>
          )
      }
    </>

  )
}

export default TaskList