import { useState, useCallback } from 'react';

const useTasks = (api, sessionID, onUnauthorizedError) => {
  const [tasks, setTasks] = useState([]);  // initialize to an empty list of tasks

  // use our helper to get the asynchronous list of tasks from axios, then
  // chain a callback to set our tasks state once we have the result

  const refreshTasks = useCallback(async () => {
    try {
      const tasks = await api.getTasksAsync(sessionID);
      setTasks(tasks);
    } catch (err) {
      console.log(err.message);
      onUnauthorizedError();
      throw err;
    }
  }, [api, sessionID, onUnauthorizedError]);

  // use our helper to asynchronously update the specified task, then
  // chain a callback to set our tasks state once a successful result is
  // returned. We duplicate the old list of tasks, but replace the task
  // corresponding to our update with the task value we got back from our
  // helper.

  const updateTask = useCallback(async id => {
    // find the task we want to update
    const task = tasks.find(task => task.id === id);

    // If we didn't find the task for some reason, just return
    if (!task) { return; }

    // start the async task to toggle the completion
    try {
      const newTask = await api.updateTaskAsync(id, !task.isComplete, sessionID);
      // use the callback style of updating the tasks list
      // oldTasks will receive the current contents of the tasks state
      setTasks(oldTasks => {
        // return the new value for the tasks state
        return oldTasks.map(task => {
          if (task.id === newTask.id) {
            // if this task is the one we just updated, return the new data we
            // got from the api result to use in the tasks list
            return newTask;
          } else {
            // otherwise, it's an existing task, so just use it
            return task;
          }
        });
      });
    } catch (err) {
      console.log(err.message);
      onUnauthorizedError();
      throw err;
    }
  }, [api, tasks, sessionID, onUnauthorizedError]);


  // use our helper to asynchronously delete the specified task, then
  // chain a callback to set our tasks state once a successful result is
  // returned. Notice that the input to the .then is empty, since we didn't
  // return anything from the .then of the helper. But if an error had
  // occurred, the code would jump over the .then and run the .catch instead

  const deleteTask = useCallback(async id => {
    try {
      await api.deleteTaskAsync(id, sessionID);
      
      // use the callback style of updating the tasks list
      // oldTasks will receive the current contents of the tasks state
      setTasks(oldTasks => {
        // return the new value for the tasks state
        return oldTasks.filter(task => task.id !== id);
      });
    } catch (err) {
      console.log(err.message);
      onUnauthorizedError();
      throw err;
    }
  }, [api, sessionID, onUnauthorizedError]);

  const addTask = useCallback(async taskData => {
    try {
      const task = await api.addTaskAsync(taskData, sessionID);

      // use the callback style of updating the tasks list
      // oldTasks will receive the current contents of the tasks state
      // this is very short, so we can use the implied return arrow function
      setTasks(oldTasks => [ ...oldTasks, task ]);
    } catch (err) {
      console.log(err.message);
      onUnauthorizedError();
      throw err;
    }
  }, [api, sessionID, onUnauthorizedError]);

  return {
    tasks,
    refreshTasks,
    updateTask,
    deleteTask,
    addTask
  };
};

export default useTasks;