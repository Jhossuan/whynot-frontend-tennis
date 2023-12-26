export const getHeaderToken = () => {
    return { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } }
}