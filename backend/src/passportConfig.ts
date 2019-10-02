import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import UsersDao from "./users/users.dao";

export const configurePassport = () => {
  // Local Strategy
  // Logging in with username and password and generating a JWT
  // for the frontend to store in a cookie and pass in the Authorization header
  passport.use(
    "signup",
    new LocalStrategy(
      {
        usernameField: "username",
        passwordField: "password",
        session: false,
      },
      (username, password, done) => {
        try {
          console.log("blah");
        } catch (err) {
          done(err);
        }
      }
    )
  );

  passport.use(
    "login",
    new LocalStrategy(
      {
        usernameField: "username",
        passwordField: "password",
        session: false,
      },
      (username, password, done) => {
        console.log("Do shtuff");
      }
    )
  );

  // JWT Strategy for Protected Routes
  // Extracting out JWT from Authorization header and verifying the
  // payload's user id exists in the database before allowing the
  // user to make an API call
  const jwtStrategyOptions = {
    // Extract JWT from Authorization header that looks like
    // Authorization: bearer <jwt>
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    // Secret/key used to verify the token's signature
    secretOrKey: process.env.JWT_SECRET || "someJwtSecret",
  };

  passport.use(
    "jwt",
    new JwtStrategy(jwtStrategyOptions, (jwtPayload, done) => {
      // Find out if user is in the database
    })
  );

  // TODO: Facebook Strategy

  // TODO: Twitter Strategy

  // TODO: LinkedIn Strategy
};
