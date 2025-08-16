// C#-like dictionary with familiar methods/semantics using Map under the hood
export class Dictionary<TKey, TValue> {
  private map: Map<TKey, TValue>;

  constructor(entries?: Iterable<readonly [TKey, TValue]>) {
    this.map = new Map<TKey, TValue>();
    if (entries) {
      for (const [k, v] of entries) this.add(k, v);
    }
  }

  // C# Dictionary.Add: throws if key already exists
  add(key: TKey, value: TValue): void {
    if (this.map.has(key)) {
      throw new Error("An item with the same key has already been added.");
    }
    this.map.set(key, value);
  }

  // C# indexer set: adds or updates
  set(key: TKey, value: TValue): void {
    this.map.set(key, value);
  }

  // C# indexer get: throws if missing
  get(key: TKey): TValue {
    if (!this.map.has(key)) {
      throw new Error("The given key was not present in the dictionary.");
    }
    return this.map.get(key)!;
  }

  // C# TryGetValue
  tryGetValue(key: TKey): [found: true, value: TValue] | [found: false, value: undefined] {
    if (this.map.has(key)) return [true, this.map.get(key)!];
    return [false, undefined];
  }

  containsKey(key: TKey): boolean {
    return this.map.has(key);
  }

  remove(key: TKey): boolean {
    return this.map.delete(key);
  }

  clear(): void {
    this.map.clear();
  }

  get count(): number {
    return this.map.size;
  }

  keys(): IterableIterator<TKey> {
    return this.map.keys();
  }

  values(): IterableIterator<TValue> {
    return this.map.values();
  }

  entries(): IterableIterator<[TKey, TValue]> {
    return this.map.entries();
  }

  forEach(callback: (value: TValue, key: TKey, dict: this) => void): void {
    for (const [k, v] of this.map) callback(v, k, this);
  }

  // Optional: allow iteration with for..of
  [Symbol.iterator](): IterableIterator<[TKey, TValue]> {
    return this.entries();
  }
}