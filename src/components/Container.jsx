const Container = (props) => {
  return (
    <div className='container mx-auto my-48 max-w-xl overflow-hidden rounded-2xl shadow-md shadow-black/40 ring-black/40'>
      {props.children}
    </div>
  )
}

export default Container
