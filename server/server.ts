import jsonServer from 'json-server'
import path from 'path'

const server = jsonServer.create()

const router = jsonServer.router(path.resolve(__dirname, 'db.json'))

server.use(jsonServer.defaults({}))
server.use(jsonServer.bodyParser)

server.use(async (req, res, next) => {
    console.log(req.body)
    await new Promise((res) => {
        setTimeout(res, 300)
    })
    next()
})

server.use(router)

// запуск сервера
server.listen(8000, () => {
    console.log('server is running on 8000 port')
})
