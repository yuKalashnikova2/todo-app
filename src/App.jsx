import { useState } from 'react'
import Page from './components/Page'
import Container from './components/Container'
import Header from './components/Header'
import Form from './components/Form'
import Empty from './components/Empty'
import Task from './components/Task'
import Counter from './components/Counter'

export const App = () => {
  const [taskList, setTaskList] = useState([])
  const [completedTaskList, setcompletedTaskList] = useState('')
  const [error, setError] = useState('')

  const handleCompleteTask = (task) => {
    if (completedTaskList.includes(task)) {
      setcompletedTaskList(completedTaskList.filter((t) => t !== task))
    } else {
      setcompletedTaskList([...completedTaskList, task])
    }
  }

  const handleRemoveTask = (task) => {
    setTaskList(taskList.filter((t) => t !== task))
    setcompletedTaskList(completedTaskList.filter((t) => t !== task))
  }

  const handleSubmit = (task) => {
    setError('')

    if (!task) {
      return
    }

    if (taskList.includes(task)) {
      setError(<div className='uppercase text-red-500'>Такая задача уже есть!</div>)
      return
    }

    setTaskList([...taskList, task])
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
          <div className='my-2 flex flex-col'>
            {' '}
            {taskList.length === 0
              ? 'Задач нет'
              : taskList.map((task, index) => (
                  <Task
                    key={index}
                    index={index + 1}
                    completed={completedTaskList.includes(task)}
                    onChange={handleCompleteTask}
                    onRemove={handleRemoveTask}
                  >
                    {task}
                  </Task>
                ))}
          </div>
        </Empty>

        {taskList.length > 0 && (
          <Counter countCompleted={completedTaskList.length} countTotal={taskList.length}></Counter>
        )}
      </Container>
    </Page>
  )
}
