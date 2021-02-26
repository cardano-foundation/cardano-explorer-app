
export const addEllipsis = (text: string, partOnelength: number, partTwoLength: number): string =>
  text.substring(0, partOnelength) + '...' + text.substring(text.length - partTwoLength)
