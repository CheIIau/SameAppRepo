import autoprefixer from 'autoprefixer'
import tailwindcss from 'tailwindcss'

/** @type {import('postcss-load-config').ConfigFn} */
const config = ({ env }) => ({
    plugins: [autoprefixer(), tailwindcss()],
})

export default config
