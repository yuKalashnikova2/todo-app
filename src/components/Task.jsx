const Task = ({ index, children, completed, onChange }) => {
  return (
    <div className='my-2 h-12 rounded-md bg-white px-6 py-2.5 text-start ring-2 ring-gray-200'>
      <label className={`task ${completed ? 'text-black' : 'text-gray-200'}`}>
        <input
          type='checkbox'
          className='mr-4 rounded text-blue-500 focus:ring-0'
          checked={completed}
          onChange={() => onChange(children)}
        />
        {index}. {children}
      </label>
    </div>
  )
}

export default Task
