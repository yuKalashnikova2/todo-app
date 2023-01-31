const Empty = (props) => {
  return (
    <div className='p-6 text-center text-slate-400'>
      {/* Задач нет */}
      {props.children}
    </div>
  )
}

export default Empty
