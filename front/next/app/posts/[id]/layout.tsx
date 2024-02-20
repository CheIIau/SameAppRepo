import { Suspense, type FC, type PropsWithChildren } from "react";
import Page from "./page";
import FullScreenSpinner from "@/components/UI/Spinner/FullScreenSpinner";

interface layoutProps extends PropsWithChildren {
    params: {
        id: string;
    };
}

const Layout: FC<layoutProps> = ({ params }) => {
    const id = params.id;

    return (
        <>
            <Suspense fallback={<FullScreenSpinner />}>
                <Page params={{ id }} />
            </Suspense>
        </>
    );
};

export default Layout;
