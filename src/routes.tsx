import { PropsWithChildren } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom"
import CategoriasPage from "./pages/CategoriasPage";
import DashboardPage from "./pages/DashboardPage";
import DepartamentosPage from "./pages/DepartamentosPage";
import Error404Page from "./pages/Error404Page";
import HomePage from "./pages/Home";
import PatrimoniosPage from "./pages/PatrimoniosPage";


export const AppRouter = ({ children }: PropsWithChildren) => {
    return (
        <BrowserRouter>
            {children}
        </BrowserRouter>
    )
}

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/dashboard" element={<DashboardPage />}></Route>
            <Route path="/departamentos" element={<DepartamentosPage />}></Route>
            <Route path="/categorias" element={<CategoriasPage />}></Route>
            <Route path="/patrimonios" element={<PatrimoniosPage />}></Route>
            <Route path="*" element={<Error404Page />}></Route>
        </Routes>
    )
}