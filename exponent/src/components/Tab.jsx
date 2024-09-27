
const Tab = ({content}) => {
  return (
    <div className="rounded-md border bg-stone-800 border-stone-800 cursor-pointer px-2 m-4 h-8 flex justify-center items-center">
        <h1 className="text-stone-400">{content}</h1>
    </div>
  )
}



export default Tab