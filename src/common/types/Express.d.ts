declare namespace Express {
  /**
   * Middleware verify the access token & assign more information to the Request params.
   */
  interface Request {
    timestamp?: number;
    correlationId?: string;
    accessToken?: string;
    user?: {
      userId?: number;
    };
    permissions?: {
      name?: string;
      actions?: string[];
    }[];
  }
}
