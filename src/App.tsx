import { AppContextProvider } from "./context/AppContext"
import Application from "./pages/App"

function App() {

  return (
      <AppContextProvider>
        <Application />
      </AppContextProvider>
  )
}

export default App
