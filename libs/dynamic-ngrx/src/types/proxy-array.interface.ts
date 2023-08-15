/**
 * This interface allows us to access the internals of
 * an array wrapped by the Proxy class.
 */
export interface ProxyArray<T> extends Array<T> {
  θisProxyθ: true;
  rawArray: string[];
}
