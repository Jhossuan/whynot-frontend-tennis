import { Routes, Route } from 'react-router-dom'
import AppLayout from '../../components/AppLayout'
import { RequireAuth, NotRequireAuth } from '../../utils/auth_tool'
import Home from '../Admin/Home'
import UserEntry from '../Auth/UserEntry'
import Users from '../Admin/Users'
import Landing from '../Users/NoAuth'
import LayoutH from '../Users/LayoutH'
import UserHome from '../Users/Auth'
import Tournaments from '../Admin/Tournaments'
import Leagues from '../Leagues'
import { useContext } from 'react'
import { AppContext } from '../../context/AppContext'
import ListTournaments from '../Tournaments'

const Application = () => {

  const { userToken } = useContext(AppContext)

  return (
    <AppLayout>
      <Routes>
  {/* ----------------- RUTAS PROTEGIDAS ------------------  */}
          <Route path='/home' element={
            <RequireAuth>
              <Home />
            </RequireAuth>
          }/>

          <Route path='/users' element={
            <RequireAuth>
              <Users />
            </RequireAuth>
          }/>

          <Route path='/admin/tournaments' element={
            <RequireAuth>
              <Tournaments />
            </RequireAuth>
          }/>

          <Route path='/player' element={
            <RequireAuth>
              <UserHome />
            </RequireAuth>
          }/>
  {/* ----------------- RUTAS PUBLICAS ------------------  */}
          <Route path='/auth' element={
            <NotRequireAuth>
              <UserEntry />
            </NotRequireAuth>
          }/>

          <Route path='/' element={
            <LayoutH>
              <NotRequireAuth>
                <Landing />
              </NotRequireAuth>
            </LayoutH>
          }/>

          <Route path='/tournaments' element={
            userToken 
              ? (
                  <ListTournaments />
              )
              : (
                <LayoutH>
                  <ListTournaments />
                </LayoutH>
              )
          }/>

          <Route path='/leagues' element={
            userToken 
            ? (
                <Leagues />
            )
            : (
              <LayoutH>
                <Leagues />
              </LayoutH>
            )
          }/>

      </Routes>

  {/* ----------------- RUTAS PUBLICAS CON NAVBAR ------------------  */}

    </AppLayout>
  )
}

export default Application