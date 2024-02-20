import { FC, PropsWithChildren } from 'react'
import classes from './Spinner.module.css'

interface SpinnerProps extends PropsWithChildren {
    readonly size?: string
    readonly color?: string
    readonly width?: string
}

export const Spinner: FC<SpinnerProps> = ({ size = '10px', color = '#fff', width = '6px' }) => {
    const containerSize = parseInt(size, 10) + 16 + 'px'
    return (
        <div
            className={classes['lds-dual-ring']}
            /// @ts-expect-error
            style={{ '--size': size, '--color': color, '--containerSize': containerSize, '--width': width }}
        />
    )
}
