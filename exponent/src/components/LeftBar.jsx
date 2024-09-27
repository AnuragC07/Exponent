import SpaceDashboardRoundedIcon from '@mui/icons-material/SpaceDashboardRounded';
import CategoryRoundedIcon from '@mui/icons-material/CategoryRounded';
import DataUsageRoundedIcon from '@mui/icons-material/DataUsageRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';

const LeftBar = () => {
  return (
    <div className="w-64 h-screen flex flex-col justify-between p-2 pt-12">
        <ul className="flex flex-col gap-4 items-start">
            <li className="hover:bg-stone-800 h-8 w-fit px-4 rounded-md cursor-pointer flex gap-2"><SpaceDashboardRoundedIcon className='text-stone-500 mt-1'/> <p className='text-lg text-stone-500'>Dashboard</p> </li>
            <li className="hover:bg-stone-800 h-8 w-fit px-4 rounded-md cursor-pointer flex gap-2"><CategoryRoundedIcon className='text-stone-500 mt-1'/> <p className='text-lg text-stone-500'>Collections</p></li>
            <li className="hover:bg-stone-800 h-8 w-fit px-4 rounded-md cursor-pointer flex gap-2"><DataUsageRoundedIcon className='text-stone-500 mt-1'/> <p className='text-lg text-stone-500'>Analytics</p> </li>
            <li className="hover:bg-stone-800 h-8 w-fit px-4 rounded-md cursor-pointer flex gap-2"><SettingsRoundedIcon className='text-stone-500 mt-1'/> <p className='text-lg text-stone-500'>Settings</p> </li>
        </ul>
    </div>
  )
}

export default LeftBar