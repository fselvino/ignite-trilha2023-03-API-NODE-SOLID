import 'dotenv/config'
import {z} from 'zod'


//schema de validação das variaveis de ambiente
const envSchema = z.object({
    NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
    PORT:  z.coerce.number().default(3333) //coerce - conver o valor para um numero -- se a porta não form encontrada recebe com padrão 3333
})

const _env = envSchema.safeParse(process.env)

if(_env.success === false){
    console.error('Invalid environment variables', _env.error.format())

    throw new Error('Invalid environment variables.')

}

//caso passe no test exportamos os dados da constante _env
export const env = _env.data