export function cleanFormValues(values: any): any {
  const cleanValues = {};
  for (let key in values) {
    if (values[key] !== '' && values[key] !== null) {
      cleanValues[key] = values[key];
    }
    continue;
  }
  return cleanValues;
}

export function checkForBoolean(value: any): boolean {
  if (!value) {
    return false;
  }
  return value?.toLowerCase() === "true" ? true : value?.toLowerCase() === "false" ? false : value;
}
