import { useEffect } from 'react';
import TaskList from '../components/TaskList';
import NewTaskForm from '../components/NewTaskForm';
import useTasks from '../hooks/useTasks';
import PropTypes from 'prop-types';

const TasksPage = ({ api, sessionID, onUnauthorizedError }) => {
  const { tasks, refreshTasks, updateTask, deleteTask, addTask } = useTasks(api, sessionID, onUnauthorizedError);

  // schedule our first refresh to run when the component mounts
  useEffect(() => {
    refreshTasks();
  }, [refreshTasks]);

  return (
    <div className="TasksPage">
      <div>
        <TaskList
          tasks={tasks}
          onToggleCompleteCallback={updateTask}
          onDeleteCallback={deleteTask}
        />
      </div>
      <div>
        <NewTaskForm onAddTaskCallback={addTask} />
      </div>
    </div>
  );
};

TasksPage.propTypes = {
  api: PropTypes.object.isRequired,
  sessionID: PropTypes.string.isRequired,
  onUnauthorizedError: PropTypes.func.isRequired,
};

export default TasksPage;