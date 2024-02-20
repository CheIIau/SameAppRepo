import { Suspense, type FC, type PropsWithChildren } from "react";
import Page from "./page";
import FullScreenSpinner from "@/components/UI/Spinner/FullScreenSpinner";

const Layout: FC = () => {
    return (
        <Suspense fallback={<FullScreenSpinner color="green" />}>
            <Page />
        </Suspense>
    );
};

export default Layout;
