import { useState } from 'react'
import Page from './components/Page'
import Container from './components/Container'
import Header from './components/Header'
import Form from './components/Form'
import Empty from './components/Empty'

export const App = () => {
  const [taskList, setTaskList] = useState([])

  return (
    <Page>
      <Container>
        <Header>
          <Form onSubmit={(task) => setTaskList([...taskList, task])}></Form>
        </Header>
        <Empty>
          <div>{JSON.stringify(taskList)}</div>
        </Empty>
      </Container>
    </Page>
  )
}
