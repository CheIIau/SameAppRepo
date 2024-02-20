import type { FC, PropsWithChildren } from "react";
import { Spinner } from "./Spinner";

interface FullScreenSpinnerProps extends PropsWithChildren {
    readonly color?: string;
}

const FullScreenSpinner: FC<FullScreenSpinnerProps> = ({
    color = "#F87171",
}) => {
    return (
        <div className="absolute inset-0 flex justify-center items-center">
            <Spinner size="130px" color={color} width="7px" />
        </div>
    );
};
export default FullScreenSpinner;
