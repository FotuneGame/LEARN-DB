import passport from "passport";
import { gitHubStrategy } from "./github";
import { googleStrategy } from "./google";

// Сериализация пользователя
passport.serializeUser((user: any, done) => {
  done(null, {
    provider: user.provider,
    id: user.id,
    email: user.email,
    displayName: user.displayName
  });
});

// Десериализация пользователя
passport.deserializeUser((obj: any, done) => {
  done(null, obj);
});

// Регистрация стратегий
passport.use("github", gitHubStrategy);
passport.use("google", googleStrategy);

export default passport;