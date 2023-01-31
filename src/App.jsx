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

  const handleCompleteTask = (task) => {
    if (completedTaskList.includes(task)) {
      setcompletedTaskList([...completedTaskList.filter((t) => t !== task)])
    } else {
      setcompletedTaskList([...completedTaskList, task])
    }
  }

  return (
    <Page>
      <Container>
        <Header>
          <Form onSubmit={(task) => setTaskList([...taskList, task])}></Form>
        </Header>
        <Empty>
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
                  >
                    {task}
                  </Task>
                ))}
          </div>
        </Empty>

        <Counter countCompleted={completedTaskList.length} countTotal={taskList.length}></Counter>
      </Container>
    </Page>
  )
}
