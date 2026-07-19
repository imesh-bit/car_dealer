export function getMessage(messages, key) {
  const value = key.split(".").reduce((current, part) => {
    if (current && typeof current === "object" && part in current) {
      return current[part];
    }

    return undefined;
  }, messages);

  return typeof value === "string" ? value : key;
}
