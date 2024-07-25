import axios from 'axios';

const axiosInstance = axios.create({
  withCredentials: true // Ensure credentials are sent with every request
 });
 
class TaskListApi {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  static taskApiToJson(task) {
    // unpack the fields of a task, renaming is_complete to isComplete in the 
    // process.
    const { description, id, is_complete: isComplete, title } = task;
  
    // reassemble the fields into an object, now with JS-style fields
    return { description, id, isComplete, title };
  }
  
  static userApiToJson(user) {
    const { id, name, email } = user;
    return { id, name, email };
  }
  
  static sessionApiToJson(session) {
    const { id, user: { id: userID, name, email } } = session;
    return { id, user: { id: userID, name, email } };
  }
  
  // helper function to get all tasks. this function makes the axios call, and
  // unpacks the response data (returning a list of task objects), or throwing
  // a simple error. in order for this to be used from the component, we need to
  // be sure to return the final promise, so that the component can add additional
  // then/catch clauses to update its state or do any additional error handling
  
  async getTasksAsync() {
    try {
      const response = await axiosInstance.get(`${this.baseUrl}/tasks`);
      // const response = await axios.get(`${this.baseUrl}/tasks`, { headers });
  
      // convert the received tasks from having python-like keys to JS-like keys
      // using a helper function (TaskListApi.taskApiToJson) that will be run on each task
      // in the result.
      return response.data.map(TaskListApi.taskApiToJson);
  
    } catch (err) {
      console.log(err);
  
      // throw a simplified error
      throw new Error('error fetching tasks');
    }
  }
  
  // helper function to mark a task complete or incomplete. To do so, we need
  // to know the id of the task being modified, as well as whether we are
  // marking it complete or incomplete. Using that information, we can pick which
  // endpoint to use (since marking complete and incomplete are two different
  // endpoints in task-list).
  
  async updateTaskAsync(id, markComplete) {
    const endpoint = markComplete ? 'mark_complete' : 'mark_incomplete';
    
    try {
      const response = await axiosInstance.patch(`${this.baseUrl}/tasks/${id}/${endpoint}`, null);
  
      // convert the received task from having python-like keys to JS-like keys
      // using a helper function (TaskListApi.taskApiToJson)
      return TaskListApi.taskApiToJson(response.data.task);
  
    } catch (err) {
      console.log(err);
  
      // throw a simplified error
      throw new Error(`error updating task ${id}`);
    }
  }
  
  // helper function to delete a task. This function makes the asynchronous API
  // call using axios to delete the specified task.
  
  async deleteTaskAsync(id) {
    try {
      await axiosInstance.delete(`${this.baseUrl}/tasks/${id}`);
    } catch (err) {
      console.log(err);
  
      // throw a simplified error
      throw new Error(`error deleting task ${id}`);
    }
  }
  
  async addTaskAsync(taskData) {
    
    // extract values from taskData
    const { title } = taskData;
    
    // compute additional values
    const description = 'created in Task List Front End';
    
    // build a request body using a string key to avoid having the linter
    // yell at us
    const body = { title, description };
    
    try {
      const response = await axiosInstance.post(`${this.baseUrl}/tasks`, body);
      
      // convert the received task from having python-like keys to JS-like keys
      // using a helper function (TaskListApi.taskApiToJson)
      return TaskListApi.taskApiToJson(response.data.task);
  
    } catch (err) {
      console.log(err);
  
      // throw a simplified error
      throw new Error('error creating task');
    }
  }

  async registerUserAsync(userData) {
    // extract values from userData
    const { name, email, password } = userData;
  
    // build a request body using a string key to avoid having the linter
    // yell at us
    const body = { name, email, password };
  
    try {
      const response = await axiosInstance.post(`${this.baseUrl}/users`, body);
  
      // convert the received user from having python-like keys to JS-like keys
      // using a helper function (UserListApi.userApiToJson)
      return TaskListApi.userApiToJson(response.data.user);
  
    } catch (err) {
      console.log(err);
  
      // throw a simplified error
      throw new Error('error creating user');
    }
  }

  async loginUserAsync(loginData) {
    // extract values from userData
    const { email, password } = loginData;
  
    // build a request body using a string key to avoid having the linter
    // yell at us
    const body = { email, password };
  
    try {
      const response = await axiosInstance.post(`${this.baseUrl}/sessions`, body);
  
      // convert the received user from having python-like keys to JS-like keys
      // using a helper function (UserListApi.userApiToJson)
      return TaskListApi.sessionApiToJson(response.data.session);
  
    } catch (err) {
      console.log(err);
  
      // throw a simplified error
      throw new Error('login failed');
    }
  }

  async logoutUserAsync() {
    try {
      // await axios.delete(`${this.baseUrl}/sessions/${sessionID}`, { headers });
      await axiosInstance.delete(`${this.baseUrl}/sessions`);
  
    } catch (err) {
      console.log(err);
  
      // throw a simplified error
      throw new Error('login failed');
    }
  }
}

export default TaskListApi;