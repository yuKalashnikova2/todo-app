const Task = ({ index, children, completed, onChange, onRemove }) => {
  return (
    <div className='my-2 flex h-12 justify-between rounded-md bg-white px-6 py-2.5 text-start ring-2 ring-gray-200'>
      <label className={`task ${completed ? 'text-black' : 'text-gray-200'} `}>
        <input
          type='checkbox'
          className='mr-4 rounded text-blue-500 focus:ring-0'
          checked={completed}
          onChange={(e) => onChange(e.target.checked)}
        />
        {index}. {children}
      </label>
      <button className='h-8 w-8 rounded-md  text-xl text-gray-400' onClick={() => onRemove(children)}>
        x
      </button>
    </div>
  )
}

export default Task
