import Container from './components/Container'
import Header from './components/Header'
import Form from './components/Form'

export const App = () => {
  return (
    <Container>
      <Header>
        <Form></Form>
      </Header>

      <div className='space-y-4 p-6 text-center text-slate-400'>Задач нет</div>
    </Container>
  )
}
