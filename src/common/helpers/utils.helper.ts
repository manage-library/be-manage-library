export function randomString(length = 6) {
  let result = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export function removeNullProperty(obj) {
  const newObject = Object.keys(obj)
    .filter((k) => obj[k] != null)
    .reduce((a, k) => ({ ...a, [k]: obj[k] }), {});
  return newObject;
}
