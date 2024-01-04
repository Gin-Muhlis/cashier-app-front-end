import axios from "axios";
import NextAuth, { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import CredentialsProvider from "next-auth/providers/credentials";

// export default NextAuth({
//   providers: [
//     CredentialsProvider({
//       type: "credentials",
//       credentials: {},
//       async authorize(credentials, req) {
//         const url = process.env.NEXT_PUBLIC_API_URL + "/auth/login";

//         const { email, password } = credentials as {
//           email: string;
//           password: string;
//         };
//         const formData = new URLSearchParams();
//         formData.append("username", email);
//         formData.append("password", password);

//         await axios
//           .post(url, formData, {
//             headers: {"Accept": "application/json"},
//           })
//           .then((response) => {
//             return response;
//           })
//           .catch((error) => {
//             console.log(error.response);
//           });

//         return null;
//       },
//     }),
//   ],

//   pages: {
//     signIn: "/auth/login",
//   },
// });

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  secret: "technoG77",
  providers: [
    CredentialsProvider({
      type: "credentials",
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password " },
      },
      async authorize(credentials) {
        const {email, password} = credentials as {
            email: string,
            password: string
        }
        const user: any = {
            id: 1,
                name: 'admin',
                email: 'admin@gmail.com',
                role: 'admin'
        }
        if (email == 'admin@gmail.com' && password == 'admin') {
            return user
        } else {
            return null
        }
      }
    }),
  ],
  callbacks: {
    async jwt({token, account, profile, user}: any) {
        if (account?.prodiver == 'credentials') {
            token.email = user.email
            token.name = user.name
            token.role = user.role
        }

        return token;
    },

    async session({session, token}: any) {
        if ('email' in token) {
            session.user.email = token.email
        }
        if ('name' in token) {
            session.user.email = token.email
        }
        if ('role' in token) {
            session.user.role = token.role
        }
        return session
    }
  },
  
};
