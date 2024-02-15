import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import Credentials from "next-auth/providers/credentials";

const authOption: NextAuthOptions = {
    session: {
        strategy: 'jwt'
    },
    secret: "technoG77",
    providers: [
        Credentials({
            type: 'credentials',
            name: 'credentials',
            credentials: {
                email: {label: 'Email', type: 'email'},
                password: {label: 'Password', type: 'password'},
            },
            async authorize(credentials) {
                const { email, password } = credentials as {
                    email: string;
                    password: string
                }

                // CEK USER KE DATABASE
                return null
            }
        })
    ],
    callbacks: {
        async jwt({token, account, profile, user}: any) {
            if (account?.provider === 'credentials') {
                token.email = user.email;
                token.name = user.name;
                token.role = user.role

            }

            return token;
        },
        async session({session,token}: any) {
            if ("email" in token) {
                session.user.email = token.email
            }
            if ("name" in token) {
                session.user.name = token.name
            }
            if ("role" in token) {
                session.user.role = token.role
            }

            return session
        }
    },
    pages: {
        signIn: '/auth/login'
    }
}

const handler = NextAuth(authOption)

export {
    handler as GET,
    handler as POST
}