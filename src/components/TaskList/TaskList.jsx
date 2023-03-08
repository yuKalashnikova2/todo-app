import { taskReducer, errorReducer } from './reducers'
import { useReducer, useState, useMemo } from 'react'
import Page from '../Page'
import Container from '../Container'
import Header from '../Header'
import Form from '../Form'
import Empty from '../Empty'
import Task from '../Task'
import Counter from '../Counter'
import { initialTaskList } from './state'
import Selected from '../Selected'

const TaskList = () => {
  const storageKey = 'taskList'
  const [taskList, dispatchTaskList] = useReducer(taskReducer, { storageKey, initialValue: [] }, initialTaskList)
  const [error, dispatchError] = useReducer(errorReducer, '')

  const [filterActive, setFilterActive] = useState('')

  const countCompletedTask = useMemo(() => {
    return filterActive === '' ? taskList.reduce((acc, value) => (value.completed ? acc + 1 : acc), 0) : -1
  }, [taskList, filterActive])

  const filteredTaskList = useMemo(() => {
    if (filterActive === '') {
      return taskList
    }
    const value = filterActive === 'true'
    return taskList.filter((task) => task.completed !== value)
  }, [taskList, filterActive])

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

    dispatchTaskList({ type: 'ADD_TASK', task, storageKey })
  }

  const handleCompleteTask = (value, id) => {
    dispatchTaskList({ type: 'COMPLETE_TASK', value, id, storageKey })
  }

  const handleRemoveTask = (id) => {
    dispatchTaskList({ type: 'REMOVE_TASK', id, storageKey })
  }

  const handleChangeFilter = (event) => {
    setFilterActive(event.target.value)
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

          <Selected value={filterActive} onChange={handleChangeFilter} />

          {(!!taskList && !!taskList.length && (
            <>
              <div className='my-2 flex flex-col'>
                {filteredTaskList.map((task, index) => (
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
              <Counter countCompleted={countCompletedTask} countTotal={filteredTaskList.length}></Counter>
            </>
          )) || <div>No tasks</div>}
        </Empty>
      </Container>
    </Page>
  )
}

export default TaskList
