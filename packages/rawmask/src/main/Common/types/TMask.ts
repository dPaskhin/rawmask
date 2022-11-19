/**
 * Prepared mask contains only array of escaped string and RegExp
 */
export type TDetailedMask = Array<string | RegExp>;

/**
 * Raw mask contains string or array of string/RegExp.
 */
export type TMask = string | TDetailedMask;
