import { Strategy as GitHubStrategy } from "passport-github2";
import { Profile } from 'passport';

interface GitHubProfile extends Profile {
  displayName: string;
  emails?: { value: string; verified: boolean }[];
  username?: string;
}

export const gitHubStrategy = new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID || "",
  clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
  callbackURL: `${process.env.URL_BASE_INGRESS}${process.env.GITHUB_URL_CALLBACK}`,
  scope: ['user:email'],
  passReqToCallback: true // Добавляем для консистентности
},
async (req: any, accessToken: string, refreshToken: string, profile: GitHubProfile, done: Function) => {
  try {
    // Более надежная проверка email
    const email = profile.emails?.[0]?.value || 
                 (profile as any)._json?.email || 
                 `${profile.username}@users.noreply.github.com`;

    if (!email) {
      return done(new Error("GitHub не предоставил email"));
    }

    const userData = {
      provider: 'github',
      id: profile.id,
      displayName: profile.displayName || profile.username || '',
      email: email,
      profile 
    };

    done(null, userData);
  } catch (err) {
    done(err);
  }
});