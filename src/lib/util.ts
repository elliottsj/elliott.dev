/**
 * Create a Map of all keys and values of the given maps.
 */
export const mergeMaps = <K, V>(...maps: Map<K, V>[]) => {
  const result = new Map<K, V>();
  for (const map of maps) {
    for (const [key, value] of map.entries()) {
      result.set(key, value);
    }
  }
  return result;
};
