/**
 * Configuration properties for the ErrorPage component.
 */
export interface ErrorPageProps {
  /** The HTTP error status code determining the displayed visual asset */
  status?: '404' | '403' | '500';
  /** Main heading text displayed prominently */
  title?: string;
  /** Detailed description or message explaining the error context */
  subTitle?: string;
  /** Label text displayed inside the primary action button */
  buttonText?: string;
  /** Application route path the primary button redirects to when clicked */
  redirectTo?: string;
}
