import { getPayload } from 'payload'
import configPromise from '../../payload.config'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

dotenv.config({ path: path.resolve(dirname, '../../.env.local') })

async function createAdmin() {
    const payload = await getPayload({ config: configPromise })

    console.log('Checking for existing admin user...')

    try {
        const users = await payload.find({
            collection: 'users',
            where: {
                email: {
                    equals: 'admin@greentchad.org',
                },
            },
        })

        if (users.totalDocs > 0) {
            console.log('Admin user already exists.')
            process.exit(0)
        }

        console.log('Creating admin user...')

        await payload.create({
            collection: 'users',
            data: {
                email: 'admin@greentchad.org',
                password: 'password123',
                name: 'Admin GreenChad',
                role: 'admin',
            },
        })

        console.log('Admin user created successfully.')
        console.log('Email: admin@greentchad.org')
        console.log('Password: password123')
    } catch (error) {
        console.error('Error creating admin user:', error)
    }
    process.exit(0)
}

createAdmin()
