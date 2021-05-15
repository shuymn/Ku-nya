export function getBoolean(key: string, _default?: boolean): boolean {
  if (!window.localStorage) return false

  const item = window.localStorage.getItem(key)
  return item !== null ? item !== '0' : !!_default
}

export function getValue(key: string): string | undefined
// eslint-disable-next-line no-redeclare
export function getValue<T extends string>(key: string, defaultValue: T): T
// eslint-disable-next-line no-redeclare
export function getValue<T extends string>(
  key: string,
  defaultValue?: T,
): T | undefined {
  if (!window.localStorage) return defaultValue

  document.querySelector
  const item = window.localStorage.getItem(key)
  return item !== null ? (item as T) : defaultValue
}

export function getJSON<
  T extends Record<string, unknown> | Record<string, unknown>[],
>(key: string, defaultValue: T = {} as T): T {
  if (!window.localStorage) return defaultValue

  const item = window.localStorage.getItem(key)
  return item !== null ? JSON.parse(item) : defaultValue
}

export function setBoolean(key: string, val: boolean): boolean {
  if (!window.localStorage) return false
  window.localStorage.setItem(key, val !== false ? '1' : '0')
  return true
}

export function setValue(key: string, val: unknown): boolean {
  if (!window.localStorage) return false
  window.localStorage.setItem(key, String(val))
  return true
}

export function setJSON(
  key: string,
  obj: Record<string, unknown> | Record<string, unknown>[],
): boolean {
  if (!window.localStorage) return false
  window.localStorage.setItem(key, JSON.stringify(obj))
  return true
}
