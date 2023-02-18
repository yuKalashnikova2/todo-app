import { useReducer } from 'react'
import Page from './components/Page'
import Container from './components/Container'
import Header from './components/Header'
import Form from './components/Form'
import Empty from './components/Empty'
import Task from './components/Task'
import Counter from './components/Counter'
//import { useLocalStorage } from './hooks/useLocalStorage'

function taskReducer(taskList, action) {
  if (action.type === 'ADD_TASK') {
    const newTaskItem = {
      id: taskList.length + 1,
      name: action.task,
      completed: false
    }
    return [...taskList, newTaskItem]
  } else if (action.type === 'REMOVE_TASK') {
    return taskList.filter((task) => task.id !== action.id)
  } else if (action.type === 'COMPLETE_TASK') {
    const newTaskList = taskList.map((task) => {
      if (task.id === action.id) {
        task.completed = action.value
      }
      return task
    })

    return newTaskList
  }
}

function errorReducer(error, action) {
  if (action.type === 'SHOW_ERROR') {
    return action.text
  } else if (action.type === 'CLEAN_ERROR') {
    return ''
  }
}

export const App = () => {
  //const [taskList, setTaskList] = useLocalStorage('taskList', [])
  const [taskList, dispatchTaskList] = useReducer(taskReducer, [])
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

  // const addTask = (task) => {
  //   const newTaskItem = {
  //     id: taskList.length + 1,
  //     name: task,
  //     completed: false
  //   }

  //   const newTaskList = [...taskList, newTaskItem]

  //   setTaskList(newTaskList)
  // }

  // const removeTask = (id) => {
  //   const newTaskList = taskList.filter((task) => task.id !== id)

  //   setTaskList(newTaskList)
  // }

  // const handleSubmit = (task) => {
  //   setError('')

  //   if (!task) {
  //     setError('Пожалуйста, укажите название задачи')
  //     return
  //   }

  //   if (taskList.includes(task)) {
  //     setError(<div className='uppercase text-red-500'>Такая задача уже есть!</div>)
  //     return
  //   }

  //   addTask(task)
  // }

  // const handleCompleteTask = (value, id) => {
  //   const newTaskList = taskList.map((task) => {
  //     if (task.id === id) {
  //       task.completed = value
  //     }
  //     return task
  //   })
  //   setTaskList(newTaskList)
  // }

  // const handleRemoveTask = (task) => {
  //   removeTask(task)
  // }

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

              <Counter countCompleted={countCompletedTask} countTotal={taskList.length}></Counter>
            </>
          )) || <div>Задач нет</div>}
        </Empty>
      </Container>
    </Page>
  )
}
