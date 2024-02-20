import { FC, PropsWithChildren } from 'react'
import classes from './Header.module.css'
import { NavLink, useLocation } from '@remix-run/react'
import { checkRouteMatch } from '~/utils/helpers'

interface HeaderProps extends PropsWithChildren {}

export const Header: FC<HeaderProps> = () => {
    const links = [
        { name: 'Home', link: '/' },
        { name: 'Posts', link: '/posts/1' },
        { name: 'About', link: '/about' },
        { name: 'Todos', link: '/todos' },
    ] as const

    const location = useLocation()

    return (
        <header className={classes.header}>
            <nav className="w-full flex justify-center">
                <svg
                    viewBox="0 0 2 3"
                    className={classes.svg + ' text-indigo-800'}
                    aria-hidden="true"
                >
                    <path
                        className="fill-current"
                        d="M0,0 L1,2 C1.5,3 1.5,3 2,3 L2,0 Z"
                    />
                </svg>
                <ul className="bg-indigo-800 flex justify-center items-center [&>li]:relative [&>li]:h-full">
                    {links.map((link) => (
                        <li key={link.name}>
                            <NavLink
                                className={`${classes.link} ${checkRouteMatch(link.link, location.pathname) ? 'text-amber-600' : ''}`}
                                to={link.link}
                            >
                                {link.name}
                            </NavLink>
                        </li>
                    ))}
                </ul>
                <svg
                    viewBox="0 0 2 3"
                    className={classes.svg + ' text-indigo-800'}
                    aria-hidden="true"
                >
                    <path
                        className="fill-current"
                        d="M0,0 L0,3 C0.5,3 0.5,3 1,2 L2,0 Z"
                    />
                </svg>
            </nav>
        </header>
    )
}
