import SunnyIcon from '@mui/icons-material/Sunny';
import ButtonIcon from './ButtonIcon';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import { useDarkMode } from '../context/DarkModeContext';
function DarkModeToggle() {
    const{isDarkMode ,toggleDarkMode} = useDarkMode()

    return (
        <>
            <ButtonIcon onClick={toggleDarkMode}>
               {isDarkMode ? <SunnyIcon  titleAccess='LightMode'/> :  <NightsStayIcon titleAccess='DarkMode'/>} 
            </ButtonIcon> 
        </>
    )
}

export default DarkModeToggle
