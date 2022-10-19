import { PropsWithChildren } from "react";
import AppHeader from "../Header";

const AppScaffold = ({ children }: PropsWithChildren) => {
    return <>
        <AppHeader></AppHeader>
        {children}
    </>
}

export default AppScaffold;