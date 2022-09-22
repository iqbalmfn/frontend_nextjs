export function cutString(text, show) {
  let char = text; 
  let result = char.slice(0, show);

  if (text.length > show) {
    const suffix = '...'
    return result+suffix
  }

  return result

}