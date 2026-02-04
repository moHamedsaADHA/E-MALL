// TODO: Implement AuthService with JWT, refresh tokens, email verification logic

export class AuthService {
  static async register(payload: any) {
    // TODO: create user, send verification token
    return { ok: true };
  }

  static async login(payload: any) {
    // TODO: validate credentials, issue tokens
    return { token: 'TODO' };
  }
}
