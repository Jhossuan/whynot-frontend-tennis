import ResponsiveAppBar from '../../components/Containers/AppBar'
import { LayoutProps } from '../../types/app'

const LayoutH = (props: LayoutProps) => {
  return (
    <>
        <ResponsiveAppBar />
        <div style={{ padding:'0 10% 0 10%' }}>
          { props.children }
        </div>
    </> 
  )
}

export default LayoutH