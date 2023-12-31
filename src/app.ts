import fastify from 'fastify'
import { appRoutes } from './http/routes'
import { ZodError } from 'zod'
import { env } from './env'

export const app = fastify()

app.register(appRoutes)

//tratativa para erro global
app.setErrorHandler((error, request, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error', issues: error.format() })
  }


  if (env.NODE_ENV !== 'production') {
    console.log(error)
  } else {
    //TODO: Here we should log tod an external tool lide DataDog / NewRelic / Sentry
  }

  return reply.status(500).send({ message: 'Internal server error' })
})
