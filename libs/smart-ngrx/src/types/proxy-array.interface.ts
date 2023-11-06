/**
 * This interface allows us to access the internals of
 * an array wrapped by the Proxy class.
 */
export interface ProxyArray<T> extends Array<T> {
  /**
   * This allows us to check if the object we are looking at
   * is a ProxyArray or not. A proxy array will always have
   * this property set to true.
   */
  θisProxyθ: true;
  /**
   * This allows us to access the original array before it
   * was wrapped by the Proxy class.
   */
  rawArray: string[];
}
