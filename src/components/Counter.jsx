const Counter = ({ countCompleted, countTotal }) => {
  return (
    <div className='p-5 text-center text-gray-400'>
      Сделано {countCompleted} из {countTotal}
    </div>
  )
}

export default Counter
