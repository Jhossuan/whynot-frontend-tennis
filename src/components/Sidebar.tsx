import { SectionsObject } from "../types/app";
import { HomeOutlined, SolutionOutlined, UserOutlined } from '@ant-design/icons'

const UserMenu: SectionsObject = {
    Inicio: {
        title: "Inicio",
        route: "/",
        type: "item",
        icon: <HomeOutlined />
    },
    Eventos: {
        title: "Eventos",
        type: "subitem",
        icon: <SolutionOutlined />,
        children: [
            {title: "Torneos", route:"/admin/tournaments"},
            {title: "Ligas", route:"/leagues"},
        ]
    },
    Usuarios: {
        title: "Usuarios",
        type: "subitem",
        icon: <UserOutlined />,
        children: [
            {title: "Inicio", route: "/users"},
            {title: "Competidores", route: "/users/competitors"},
        ]
    },
}

export { UserMenu }