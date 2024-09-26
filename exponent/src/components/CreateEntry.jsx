import AddRoundedIcon from '@mui/icons-material/AddRounded';

const CreateEntry = () => {
  return (
    <div className="rounded-xl border shadow-md shadow-green-100 p-2 px-4 m-2 text-green-600 flex gap-2 text-lg cursor-pointer">
        <AddRoundedIcon className='mt-1'/>
        <h1>Create a new Entry</h1>
    </div>
  )
}

export default CreateEntry