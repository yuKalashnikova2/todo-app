const Counter = ({ countCompleted = -1, countTotal }) => {
  return countCompleted === -1 ? (
    <div>All tasks: {countTotal}</div>
  ) : (
    <div className='p-5 text-center text-gray-400'>
      Done {countCompleted} from {countTotal} tasks
    </div>
  )
}

export default Counter
