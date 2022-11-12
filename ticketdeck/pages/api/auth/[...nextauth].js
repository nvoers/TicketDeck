import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      
    }),
    // ...add more providers here
  ],
  callbacks: {
    async session({session, user, token}){
      session.user.id = parseInt(token.sub);
      return session;
    }
  }
}

export default NextAuth(authOptions)