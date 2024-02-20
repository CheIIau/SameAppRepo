import { FC, PropsWithChildren } from 'react'
import { useCartStore } from '~/store/store'

interface CartProps extends PropsWithChildren {}

export const Cart: FC<CartProps> = () => {
    const { computed } = useCartStore((state) => state)

    return (
        <summary className="fixed top-0 right-0 flex gap-3 items-center p-2 bg-teal-800 text-teal-200 rounded-b-lg mr-4">
            <div>items: {computed.totalItems}</div>
            <div>total: {computed.totalPrice}</div>
        </summary>
    )
}
