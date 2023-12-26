import { Layout, Menu, Tooltip, Button } from 'antd';
import { UserMenu } from './Sidebar';
import { useNavigate } from 'react-router-dom';
import { LogoutOutlined, SettingOutlined } from '@ant-design/icons'
import HeaderRoutes from './Header'
import { LayoutProps } from '../types/app';
import { AppContext } from '../context/AppContext';
import { useContext } from 'react'
import Cookies from 'js-cookie';
import LayoutH from '../pages/Users/LayoutH';

const { Content, Sider, Footer, Header } = Layout;

const AppLayout = (props: LayoutProps) => {

    const { userToken, userData } = useContext(AppContext)

    const navigate = useNavigate();

    const selectRoute = (item: string) => {
        navigate(item);
    }

    const SelectLayout = () => {
        switch (userData.type) {
            case 'regular':
                return (
                    <LayoutH>
                        { props.children }
                    </LayoutH>
                )
            case 'admin':
                return (
                    <Layout style={{ width: '100vw', height:'100vh' }}>
                    <Sider
                        breakpoint="lg"
                        collapsedWidth="0"
                        style={{ position: "relative", height: "100vh" }}
                    >
                    <Menu
                        mode="inline"
                        style={{ height: "100%", padding: "20px 0", zIndex: "999" }}
                    >
                        <div className='logo'>
                            Logo Here
                        </div>
                        {Object.values(UserMenu).map((section) => {
                            return (
                                <>
                                    {section.type === "item" ? (
                                        <Menu.Item
                                            key={section.route}
                                            icon={section.icon}
                                            onClick={() => selectRoute(section.route)}
                                        >
                                            {section.title}
                                        </Menu.Item>
                                    ) : (
                                            section.type === "subitem" &&
                                            section.children && (
                                                <Menu.SubMenu title={section.title} icon={section.icon}>
                                                    {section.children.map((item: any) => {
                                                        return (
                                                            <Menu.Item
                                                                key={item.route}
                                                                onClick={() => selectRoute(item.route)}
                                                            >
                                                                {item.title}
                                                            </Menu.Item>
                                                        )
                                                    })
                                                    }
                                                </Menu.SubMenu>
                                            )
                                        )
                                    }
                                </>
                            )
                        })}
                    </Menu>
                    <Footer
                        style={{
                            padding: '10px',
                            marginTop: '-60px',
                            display: 'flex',
                            justifyContent: 'space-around',
                        }}
                    >
                        <Tooltip title="Cerrar Sesión">
                            <Button
                                type='primary'
                                icon={<LogoutOutlined />}
                                danger
                                onClick={() => {Cookies.remove('token'), location.reload()}}
                            />
                        </Tooltip>
                        <Tooltip title="Configuraciones">
                            <Button
                                type='primary'
                                icon={<SettingOutlined />}
                                onClick={() => console.log('Configuraciones')}
                            />
                        </Tooltip>
                    </Footer>
                    </Sider>
                    <Layout style={{ background: "#e5e5e5" }}>
                        <Header
                            style={{
                                background: "#0366d6",
                                color: "#fff",
                                height: "15em",
                                boxShadow: "0px 5px 10px 1px #00000004"
                            }}
                        >
                            <div className='header'>
                                <HeaderRoutes />
                            </div>
                        </Header>
                        <Content
                            style={{
                                margin: "-50px 16px 0",
                                overflowY: "auto",
                                padding: "5px",
                            }}
                        >
                            {props.children}
                        </Content>
                    </Layout>
                    </Layout>
                )
            default:
                break;
        }
    }
    
    return (
        <>
            {userToken ? (
                    SelectLayout()
                ) : (
                    <Layout style={{ width: '100vw', height:'100vh' }}>
                        { props.children }
                    </Layout>
                )
            }
        </>
  );
};

export default AppLayout;
