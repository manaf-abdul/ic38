import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import bodyparser from 'body-parser'
import connectDB from './Config/DB.js'
import swaggerUI from "swagger-ui-express";
import path from 'path'
import morgan from 'morgan'
import UserRoutes from './Routes/api/user.Routes.js'
import ConceptRoutes from './Routes/api/concept.Routes.js'
import TerminologyRoutes from './Routes/api/terminology.Routes.js'
import OneLiners from './Routes/api/oneLiner.Routes.js'
import SuperCategory from './Routes/api/superCategory.Routes.js'
import LanguageRoutes from './Routes/api/language.Routes.js'
import ShortAndSimple from './Routes/api/ShortAndSimple.Routes.js'
import NumericalTest from './Routes/api/NumericalTest.Routes.js'
import PractiseTest from './Routes/api/PractiseTest.Routes.js'
import ENotes from './Routes/api/eNotes.Routes.js'
import Video from './Routes/api/videoTutorial.Routes.js'
import Poster from './Routes/api/poster.Routes.js'
import MockTest from './Routes/api/MockTest.Routes.js'
import ExamSyllabus from './Routes/api/examSyllabus.routes.js'
import LiveTest from './Routes/api/LiveTest.Routes.js'
import AdminRoute from './Routes/api/admin.Routes.js'

import { createRequire } from "module";
const require = createRequire(import.meta.url); // construct the require method
const swaggerJSDocs = require("./swaggerApi.json") // use the require method}

dotenv.config()
const app = express()
await connectDB()

app.use(morgan('dev'))
app.use(cors());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());


app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerJSDocs));

app.use('/api/user', UserRoutes)
app.use('/api/concepts', ConceptRoutes)
// app.use('/api/mocktest', MockTest)
app.use('/api/terminology', TerminologyRoutes)
app.use('/api/one-liners', OneLiners)
app.use('/api/supercategories', SuperCategory)
app.use('/api/language', LanguageRoutes)
app.use('/api/short-and-simple', ShortAndSimple)
app.use('/api/numericaltest', NumericalTest)
app.use('/api/practisetest',PractiseTest )
app.use('/api/mocktest',MockTest )
app.use('/api/enotes',ENotes )
app.use('/api/video',Video )
app.use('/api/poster',Poster )
app.use('/api/examsyllabus',ExamSyllabus )
app.use('/api/livetest',LiveTest )
app.use('/api/admin', AdminRoute)

const __dirname = path.resolve()

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/build')))
    
    app.get('*', (req, res) =>
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    )
} else {
    app.get('/other', (req, res) => {
        res.send('API is running....')
    })
}

app.listen(process.env.PORT || 5005, console.log(`DigrowServer running in ${process.env.PORT}`))