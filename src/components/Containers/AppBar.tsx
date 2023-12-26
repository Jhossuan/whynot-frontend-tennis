import { useContext, useState } from 'react'
import { BurgerBtn, Logo, Menu, NavLink, Navegacion, Panel } from '../../styles/NavbarStyles'
import { Menu as MMenu, MenuItem } from '@mui/material'
import { AppContext } from '../../context/AppContext'
import { Button } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { Avatar } from '@mui/material'
import { UserOutlined } from '@ant-design/icons'
import Cookies from 'js-cookie'

const NavBar = () => {

  const [active, setActive] = useState(true)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const { userData, setUserEntry, userToken } = useContext(AppContext)
  const navigate = useNavigate()

  const toggleBtn = () =>{
    setActive(!active)
  }

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  return (
    <Navegacion>
      <BurgerBtn onClick={toggleBtn} className={active ? '' : 'active'}/>
      <Logo onClick={()=>setActive(false)} to={ userToken ? '/player' : '/' }><span>Whynot League</span></Logo>
      <Panel className={active ? '' : 'active'}>
        <Menu>
          <NavLink onClick={()=>setActive(true)} to='/tournaments'>Torneos</NavLink>
          <NavLink onClick={()=>setActive(true)} to='/leagues'>Ligas</NavLink>
          {
            userData.uid !== "" && (
              <>
                <NavLink onClick={()=>setActive(true)} to='/player/inscriptions'>Mis inscripciones</NavLink>
                <NavLink onClick={()=>setActive(true)} to='/player/movements'>Mis movimientos</NavLink>
              </>
            )
          }
        </Menu>
      </Panel>
      {
        userData.uid === "" ? (
          <div>
            <Link to="/auth" onClick={() => setUserEntry('register')} style={{ textTransform:'capitalize', marginRight:'10px', color:'#000' }}>Registrarse</Link>
            <Button type='primary' href='/auth' onClick={() => setUserEntry('login')} style={{ marginRight:'10px', zIndex:'97' }}>Iniciar Sesión</Button>
          </div>
        ) : (
          <div>
            <Avatar
              aria-controls="menu-appbar"
              style={{ cursor: 'pointer', background:'#0366d6', marginRight:'10px' }}
              onClick={handleMenu}
            >
              <UserOutlined />
            </Avatar>
            <MMenu
              id="menu-appbar"
              anchorEl={anchorEl}
              transformOrigin={{ vertical: 'top', horizontal: 'center',}}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'center',}}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              keepMounted
            >
              <MenuItem onClick={handleClose} style={{ display: 'flex', alignItems:'center', justifyContent:'center' }}>
                Mi Perfil
              </MenuItem>
              <MenuItem onClick={handleClose} style={{ display: 'flex', justifyContent:'space-between', alignItems:'center' }}>
                <Button onClick={() => { Cookies.remove('token'), location.reload(), navigate('/') }} type='primary' danger>Cerrar Sesión</Button>
              </MenuItem>
            </MMenu>
          </div>
        )
      }
    </Navegacion>
  )
}

export default NavBar