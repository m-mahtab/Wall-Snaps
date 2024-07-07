import LandingPage from './Components/Homepage/LandingPage'
import Dashboard from './Components/Homepage/HomeContent/Dashboard'
import Settings from './Components/Homepage/HomeContent/Settings'
import ParentCategory from './Components/Homepage/HomeContent/Category/ParentCategory'
import Wallpaper from './Components/Homepage/HomeContent/Wallpaper/WallPaper'
import LiveWallpaper from './Components/Homepage/HomeContent/Wallpaper/LiveWallpaper'
import ParentWall from './Components/Homepage/HomeContent/Wallpaper/ParentWall'
import PrivacyPolicy from './Components/Homepage/HomeContent/PrivacyPolicy'
import Login from './Components/Login'
import LiveCategory from './Components/Homepage/HomeContent/Category/LiveCategory'
import PolicyPreview from './Components/Homepage/HomeContent/PolicyPreview'
import TermsPreview from './Components/Homepage/HomeContent/TermsPreview'
import { Routes, Route, } from 'react-router-dom'


import './App.css'
function App() {
  
  

  return (
    <div className='app-h'> 
    <Routes>
      
      <Route path='/index/*' element = {<LandingPage/>}>
        <Route path='settings' element = { <Settings/>} />
        <Route path='category' element = { <ParentCategory/>} />
        <Route path='livecategory' element={<LiveCategory />} />     
        <Route path='dashboard' element = {<Dashboard/>}  />
        <Route path='wallpapers' element = {<ParentWall/>}  />
        <Route path='livewallpapers' element = {<LiveWallpaper/>}  />
        <Route path='preview' element = {<PolicyPreview/>}  />
        <Route path='privacy' element = {<PrivacyPolicy/>}  />
        <Route path='termspreview' element = {<TermsPreview/>}  />
      </Route>
      
    </Routes>
      
    </div>
  )
}

export default App
