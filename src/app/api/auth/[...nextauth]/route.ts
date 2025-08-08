import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getDatabase, ref, get } from "firebase/database";
import { app } from "@/lib/firebase"; // Assuming firebase.ts is in lib

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // In a real application, you would verify credentials against a database
        const db = getDatabase(app);
        const usersRef = ref(db, 'users/' + credentials?.username); // Assuming users are stored under 'users' node with username as key
        const snapshot = await get(usersRef);

        if (snapshot.exists()) {
          const user = snapshot.val();
          // In a real application, you would compare the provided password with a hashed password from the database
          // For this example, we'll assume the password is stored directly
          if (credentials?.password === user.password) {
            // Return a user object if authentication is successful
            return { id: user.id, name: user.name, email: user.email };
          } else {
            return null; // Password does not match
          }
        } else {
          // Return null if authentication fails
          return null;
        }
    }),
  ],
  // Add other NextAuth.js options here, such as pages for sign-in/sign-out,
  // session management, callbacks, etc.
  // For example:
  // pages: {
  //   signIn: '/auth/signin',
  //   signOut: '/auth/signout',
  //   error: '/auth/error', // Error code passed in query string as ?error=
  //   verifyRequest: '/auth/verify-request', // (used for check email message)
  //   newUser: '/auth/new-user' // New users will be directed here on first sign in (leave null for default behavior)
  // }
});