const Form = (props) => {
  return (
    <form className='flex h-12 w-9/12 justify-between rounded-md bg-white px-4 py-2 ring-2 ring-gray-300'>
      {props.children}

      <input type='text' placeholder='Новая задача...' className='outline-0' />
      <button className='h-8 w-8 rounded-md bg-blue-600 text-white'>+</button>
    </form>
  )
}

export default Form
