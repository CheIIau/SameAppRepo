import { Component, ParentProps, mergeProps } from 'solid-js'
import { Spinner } from './Spinner'

interface FullScreenSpinnerProps extends ParentProps {
    readonly color?: string
}

const FullScreenSpinner: Component<FullScreenSpinnerProps> = (_props) => {
    const props = mergeProps({ color: '#F87171' }, _props)
    return (
        <div class="absolute inset-0 flex justify-center items-center">
            <Spinner
                size="130px"
                color={props.color}
                width="7px"
            />
        </div>
    )
}
export default FullScreenSpinner
