export function resolveLegacyTarget(
  to: string,
  params: Record<string, string | undefined> = {},
  search = "",
  hash = "",
): string {
  const [rawPath, targetHash] = to.split("#");
  let path = rawPath;
  for (const [key, value] of Object.entries(params)) {
    path = key === "*" ? path.replace("*", value ?? "") : path.replace(`:${key}`, value ?? "");
  }
  path = path.replace(/\/\*$/, "").replace(/\/+$/, "") || "/";
  const finalHash = hash || (targetHash ? `#${targetHash}` : "");
  return `${path}${search}${finalHash}`;
}
