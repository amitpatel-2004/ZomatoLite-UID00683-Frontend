import type { ReactNode } from 'react';

/**
 * Configuration properties for the RouteGuard component.
 */
export interface RouteGuardProps {
  /** True if the route requires a user to be logged in. */
  isProtected: boolean;
  /** Child elements to display inside the route layout. */
  children?: ReactNode;
}
