"use client";

import { useEffect, type FC, type PropsWithChildren } from "react";

interface ErrorProps {
    error: Error & { digest?: string };
    reset: () => void;
}

const ErrorPage: FC<ErrorProps> = ({ error, reset }) => {
    useEffect(() => {
        console.log(error.message);
        console.log(error.digest);
    }, [error]);
    return (
        <h1 className="w-full text-center mt-5">
            Whoopsie. Something went terribly wrong
        </h1>
    );
};
export default ErrorPage;
