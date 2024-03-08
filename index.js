import express from 'express'
import { router as movieRouter} from './movie/routes.js'
import morgan from 'morgan'
import { createWriteStream} from 'fs'
import { dirname } from 'path'
import { fileURLToPath } from 'url';
const app = express()

app.use(express.static(`${dirname(fileURLToPath(import.meta.url))}/public`));

const acessLogStream = createWriteStream('acess.log', { flags: 'a'})

app.use(morgan('common', { immediate: true, stream:acessLogStream}))
app.use(express.urlencoded({ extended: false }));
app.use(movieRouter)

app.get('/', (req, res) => {
    res.redirect('./movie') // estamos redirecionando para o caminho /movie
})

app.listen(8080, () => {
    console.log('Server is listening to http://localhost:8080')
})

