import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { NextResponse } from 'next/server'

export async function GET() {
    const payload = await getPayload({ config: configPromise })

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
            return NextResponse.json({ message: 'Admin user already exists' })
        }

        await payload.create({
            collection: 'users',
            data: {
                email: 'admin@greentchad.org',
                password: 'password123',
                name: 'Admin GreenChad',
                role: 'admin',
            },
        })

        return NextResponse.json({ message: 'Admin user created successfully' })
    } catch (error) {
        console.error('Error creating admin user:', error)
        return NextResponse.json({ error: 'Failed to create admin user' }, { status: 500 })
    }
}
