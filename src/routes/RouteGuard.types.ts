/**
 * Configuration properties for the RouteGuard component.
 */
export interface RouteGuardProps {
  /** True if the route requires a user to be logged in. */
  isProtected: boolean;
  redirectTo?: string;
}
