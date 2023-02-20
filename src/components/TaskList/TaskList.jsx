import { taskReducer, errorReducer } from './reducers'
import { useReducer } from 'react'
import Page from '../Page'
import Container from '../Container'
import Header from '../Header'
import Form from '../Form'
import Empty from '../Empty'
import Task from '../Task'
import Counter from '../Counter'
import { initialTaskList } from './state'

const TaskList = () => {
  const [taskList, dispatchTaskList] = useReducer(
    taskReducer,
    { storageKey: 'taskList', initialValue: [] },
    initialTaskList
  )
  const [error, dispatchError] = useReducer(errorReducer, '')
  const countCompletedTask = taskList.reduce((acc, value) => (value.completed ? acc + 1 : acc), 0)

  const handleCleanError = () => {
    dispatchError({ type: 'CLEAN_ERROR' })
  }

  const handleSubmit = (task) => {
    dispatchError({ type: 'CLEAN_ERROR' })

    if (!task) {
      dispatchError({
        type: 'SHOW_ERROR',
        text: 'Пожалуйста, укажите название задачи'
      })
      return
    }

    dispatchTaskList({ type: 'ADD_TASK', task })
  }

  const handleCompleteTask = (value, id) => {
    dispatchTaskList({ type: 'COMPLETE_TASK', value, id })
  }

  const handleRemoveTask = (id) => {
    dispatchTaskList({ type: 'REMOVE_TASK', id })
  }

  return (
    <Page>
      <Container>
        <Header>
          <Form onSubmit={handleSubmit} />
        </Header>
        <Empty>
          {error && (
            <div className='flex justify-between'>
              {error}{' '}
              <button className='h-7 w-7 rounded-md bg-red-500 text-xl text-white' onClick={handleCleanError}>
                x
              </button>
            </div>
          )}

          {(!!taskList && !!taskList.length && (
            <>
              <div className='my-2 flex flex-col'>
                {taskList.map((task, index) => (
                  <Task
                    key={task.id}
                    index={index + 1}
                    completed={task.completed}
                    onChange={(value) => handleCompleteTask(value, task.id)}
                    onRemove={() => handleRemoveTask(task.id)}
                  >
                    {task.name}
                  </Task>
                ))}
              </div>
              <Counter countCompleted={countCompletedTask} countTotal={taskList.length}></Counter>g
            </>
          )) || <div>Задач нет</div>}
        </Empty>
      </Container>
    </Page>
  )
}

export default TaskList
