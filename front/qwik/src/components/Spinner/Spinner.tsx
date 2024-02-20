import { component$ } from "@builder.io/qwik";
import classes from "./Spinner.module.css";

interface SpinnerProps {
    readonly size?: string;
    readonly color?: string;
    readonly width?: string;
}

export default component$(
    ({ size = "10px", color = "#fff", width = "6px" }: SpinnerProps) => {
        const containerSize = parseInt(size, 10) + 16 + "px";
        return (
            <div
                class={classes["lds-dual-ring"]}
                style={{
                    "--size": size,
                    "--color": color,
                    "--containerSize": containerSize,
                    "--width": width,
                }}
            />
        );
    }
);
