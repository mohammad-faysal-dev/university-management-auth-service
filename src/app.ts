import express, {
  request,
  type Application,
  type NextFunction,
  type Request,
  type Response,
} from 'express'
import cors from 'cors'
import { UserRoutes } from './app/modules/users/user.route.js'
import globalErrorHandler from './middlewares/globalErrorHandler.js'
import { AcademicSemesterRoutes } from './app/modules/academicSemester/academicSemester.route.js'
import httpStatus from 'http-status'
const app: Application = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api/v1/users', UserRoutes)
app.use('/api/v1/academic-semesters', AcademicSemesterRoutes)

app.get('/', (req: Request, res: Response, _next: NextFunction) => {
  res.status(200).json({ message: 'Server is running successfully' })
})

app.use(globalErrorHandler)

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'not found',
    errorMessage: [
      {
        path: req.originalUrl,
        message: 'API not found',
      },
    ],
  })
  next()
})

export default app
