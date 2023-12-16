import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider, { CredentialInput, CredentialsConfig } from "next-auth/providers/credentials";
import { NextApiRequest, NextApiResponse } from "next";


// Add types for the token and session
interface CustomToken {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
  }
  
  interface CustomSession {
    accessToken: string;
    user: {
      first_name: string;
      last_name: string;
      name: string
      // Add other user properties as needed
    };
  }
  
  const refreshTokenApiCall = async (token: CustomToken) => {
    const url = process.env.NEXT_PUBLIC_API_URL + '/auth/refresh';
    const res = await fetch(url, {
        method: "POST",
        headers: {
            "refresh-token": token.refreshToken
        }
    })
    if(res.ok) {
        const data = await res.json();
        return {
            ...token,
            error: null,
            accessToken: data.access_token,
            refreshToken: data.refreshToken,
            expiresIn: (Date.now() + (parseInt(data.expires_in) * 1000) - 2000)
        }
    } else {
        return {
            error: "RefreshTokenTokenError"
        }
    }
}

const authorize = async (
    credentials: { email: string; password: string },
    req: Pick<CredentialsConfig<Record<string, CredentialInput>>, "credentials" | "authorize">
) => {
    const url = process.env.NEXT_PUBLIC_API_URL + '/auth/token';
            const formData = new URLSearchParams();
            formData.append('username', credentials.email);
            formData.append('password', credentials.password);

            const res = await fetch(url, {
                method: "POST",
                headers: {"Accept": "application/json"},
                body: formData
            });
            if(res.ok) {
                return await res.json();
            }
            return null
}
  

const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
          name: 'Credentials',
          authorize
        })
      ],
      
      callbacks: {
        async session({ session, token }: { session: CustomSession; token: CustomToken }) {
            session.accessToken = token.accessToken;
            if(session?.accessToken ?? false) {
                const url = process.env.NEXT_PUBLIC_API_URL + '/users/me';
                const userRes = await fetch(url, {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${token.accessToken}`
                    }
                })
                if(userRes.ok) {
                    const userDetails = await userRes.json();
                    session.user = userDetails;
                    session.user.name = `${userDetails.first_name} ${userDetails.last_name}`
                }
            }
          return session
        },
        async jwt({ token, user}: { token: CustomToken; user: any }) {
            if(user) {
                token.refreshToken = user.refresh_token;
                token.accessToken = user.access_token;
                token.expiresIn = (Date.now() + (parseInt(user.expires_in) * 1000) - 2000);
            }
            if(Date.now() < token.expiresIn) {
                return token;
            }
            return await refreshTokenApiCall(token)
        }
      },
      
      pages: {
        signIn: '/auth/login',
        newUser: '/auth/register'
      }
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }