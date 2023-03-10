import { useState } from 'react'
import Page from './components/Page'
import Container from './components/Container'
import Header from './components/Header'
import Form from './components/Form'
import Empty from './components/Empty'
import Task from './components/Task'
import Counter from './components/Counter'
import { useLocalStorage } from './hooks/useLocalStorage'

export const App = () => {
  const [taskList, setTaskList] = useLocalStorage('taskList', [])

  const [error, setError] = useState('')

  const countCompletedTask = taskList.reduce((acc, value) => (value.completed ? acc + 1 : acc), 0)
  const addTask = (task) => {
    const newTaskItem = {
      id: taskList.length + 1,
      name: task,
      completed: false
    }

    const newTaskList = [...taskList, newTaskItem]

    setTaskList(newTaskList)
  }

  const removeTask = (id) => {
    const newTaskList = taskList.filter((task) => task.id !== id)

    setTaskList(newTaskList)
  }

  const handleSubmit = (task) => {
    setError('')

    if (!task) {
      setError('Пожалуйста, укажите название задачи')
      return
    }

    if (taskList.includes(task)) {
      setError(<div className='uppercase text-red-500'>Такая задача уже есть!</div>)
      return
    }

    addTask(task)
  }

  const handleCompleteTask = (value, id) => {
    const newTaskList = taskList.map((task) => {
      if (task.id === id) {
        task.completed = value
      }
      return task
    })
    setTaskList(newTaskList)
  }

  const handleRemoveTask = (task) => {
    removeTask(task)
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
              <button className='h-7 w-7 rounded-md bg-red-500 text-xl text-white' onClick={() => setError('')}>
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
