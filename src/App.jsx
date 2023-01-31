import { useState } from 'react'
import Page from './components/Page'
import Container from './components/Container'
import Header from './components/Header'
import Form from './components/Form'
import Empty from './components/Empty'
import Task from './components/Task'

export const App = () => {
  const [taskList, setTaskList] = useState([])

  return (
    <Page>
      <Container>
        <Header>
          <Form onSubmit={(task) => setTaskList([...taskList, task])}></Form>
        </Header>
        <Empty>
          <div>
            {' '}
            {taskList.length === 0
              ? 'Задач нет'
              : taskList.map((task, index) => (
                  <Task key={index} index={index + 1}>
                    {task}
                  </Task>
                ))}
          </div>
        </Empty>
      </Container>
    </Page>
  )
}
