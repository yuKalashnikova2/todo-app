import { useState } from 'react'

const Form = ({ onSubmit }) => {
  const [taskName, setTaskName] = useState('')

  const handlSubmit = (e) => {
    e.preventDefault()

    onSubmit(taskName)
    setTaskName('')
  }

  return (
    <form
      onSubmit={handlSubmit}
      className='flex h-12 w-11/12 justify-between rounded-md bg-white px-4 py-2 ring-2 ring-gray-300'
    >
      <input
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        type='text'
        placeholder='Новая задача...'
        className='outline-0 placeholder:text-slate-500'
      />
      <button type='submit' className='h-8 w-8 rounded-md bg-blue-600 text-xl text-white'>
        +
      </button>
    </form>
  )
}

export default Form
