export const routes: Record<string, object> = {
    inicio: {
        title: "Inicio",
        description: "Este es el dashboard",
        route: "/home"
    },
    torneos: {
        title: "Torneos",
        description: "Administra y crea los torneos",
        route: "/admin/tournaments"
    },
    usuarios: {
        title: "Usuarios",
        description: "Sección de los usuarios",
        route: "/users"
    },
    competidores: {
        title: "Competidores",
        description: "Manténte al tanto de los competidores",
        route: "/users/competitors"
    },
}