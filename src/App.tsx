import AppScaffold from "./components/Scaffold";
import CategoriasProvider from "./context/CategoriasContext";
import DepartamentosProvider from "./context/DepartamentosContext";
import PatrimoniosProvider from "./context/PatrimoniosContext";
import { AppRoutes } from "./routes";

function App() {
  return (
    <DepartamentosProvider>
      <CategoriasProvider>
        <PatrimoniosProvider>
          <AppScaffold>
            <AppRoutes></AppRoutes>
          </AppScaffold>
        </PatrimoniosProvider>
      </CategoriasProvider>
    </DepartamentosProvider>
  )
}

export default App;
