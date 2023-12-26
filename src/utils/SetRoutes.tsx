import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

const SetRoutes = (routes: Object) => {
    const location = useLocation();

    const [ title, setTitle ] = useState('');
    const [ description, setDescription ] = useState('');

    useEffect(() => {
        const route: { title: string, description: string } = Object.values(routes).find(
            (r: any) => r.route === location.pathname
        );

        if(route){
            setTitle(route.title);
            setDescription(route.description)
        }
    }, [location, routes])

  return [title, description]
}

export default SetRoutes