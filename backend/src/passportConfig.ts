import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import UsersDao from "./users/users.dao";
import UserModel from "./users/users.model";

export const configurePassport = () => {
  // // Local Strategy
  // // Logging in with username and password and generating a JWT
  // // for the frontend to store in a cookie and pass in the Authorization header
  // passport.use(
  //   "signup",
  //   new LocalStrategy(
  //     {
  //       usernameField: "username",
  //       passwordField: "password",
  //       session: false,
  //     },
  //     (username, password, done) => {
  //       try {
  //       } catch (err) {
  //         done(err);
  //       }
  //     }
  //   )
  // );
  // passport.use(
  //   "login",
  //   new LocalStrategy(
  //     {
  //       usernameField: "username",
  //       passwordField: "password",
  //       session: false,
  //     },
  //     async (username, password, done) => {
  //       try {
  //         const foundUser = await UsersDao.findUserByUsername(username);
  //         if (foundUser) {
  //           const isPasswordMatch = await foundUser.comparePassword(password);
  //           if (isPasswordMatch) {
  //             // Username and password match... log the user in and pass user through request
  //             return done(null, foundUser);
  //           } else {
  //             // Passwords do not match... fail the login and pass error message
  //             return done(null, false, { message: "Passwords do not match." });
  //           }
  //         }
  //         // No username found... fail the login and pass error message
  //         return done(null, false, { message: "Username not found." });
  //       } catch (err) {
  //         done(err);
  //       }
  //     }
  //   )
  // );
  // // JWT Strategy for Protected Routes
  // // Extracting out JWT from Authorization header and verifying the
  // // payload's user id exists in the database before allowing the
  // // user to make an API call
  // const jwtStrategyOptions = {
  //   // Extract JWT from Authorization header that looks like
  //   // Authorization: bearer <jwt>
  //   jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  //   // Secret/key used to verify the token's signature
  //   secretOrKey: process.env.JWT_SECRET || "someJwtSecret",
  // };
  // passport.use(
  //   "jwt",
  //   new JwtStrategy(jwtStrategyOptions, (jwtPayload, done) => {
  //     try {
  //       // Check to see username from jwtPayload exists in the database
  //     } catch (err) {
  //       done(err);
  //     }
  //   })
  // );
  // TODO: Google Auth Strategy
  // TODO: Facebook Strategy
  // TODO: Twitter Strategy
  // TODO: LinkedIn Strategy
};
