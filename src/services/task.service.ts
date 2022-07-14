import ApiEndPointEnum from "../helpers/ApiEndPointEnum";
import axiosInstance from './api';
import { IAddTask } from '../request/IAddTask'
import TaskM from "../helpers/TaskM";

class TaskService {
   getTasks() { return axiosInstance.get(ApiEndPointEnum.GetTasks); }
   getTask(id: any) { return axiosInstance.get(`${ApiEndPointEnum.GetTask}?id=${id}`); }
   addTask(task: IAddTask) { return axiosInstance.post<{ result: TaskM }>(`${ApiEndPointEnum.AddTask}`, task); }
   updateTask(id: any, name: string) { return axiosInstance.put<{ result: TaskM }>(`${ApiEndPointEnum.UpdateTask}${id}`, {name:name}); }
   completeTask(id: any) { return axiosInstance.patch<{ result: TaskM }>(`${ApiEndPointEnum.CompleteTask}${id}`); }
   deleteTask(id: any) { return axiosInstance.delete(`${ApiEndPointEnum.DeleteTask}${id}`); }
}

export default new TaskService();