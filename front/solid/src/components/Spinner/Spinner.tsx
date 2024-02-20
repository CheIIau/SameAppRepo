import { Component, ParentProps, mergeProps } from 'solid-js'
import classes from './Spinner.module.css'

interface SpinnerProps extends ParentProps {
    readonly size?: string
    readonly color?: string
    readonly width?: string
}

export const Spinner: Component<SpinnerProps> = (_props) => {
    const props = mergeProps({ size: '10px', color: '#fff', width: '6px' }, _props)
    const containerSize = parseInt(props.size, 10) + 16 + 'px'
    return (
        <div
            class={classes['lds-dual-ring']}
            style={{
                '--size': props.size,
                '--color': props.color,
                '--containerSize': containerSize,
                '--width': props.width,
            }}
        />
    )
}
