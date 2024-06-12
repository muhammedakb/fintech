export const handleFirstLetters = (
  sentence: string | null | undefined
): string => {
  if (sentence) {
    const splitted = sentence.split(' ');

    const nameFirstLetter = splitted[0].split('')[0];
    const surnameFirstLetter = splitted[splitted.length - 1].split('')[0];

    return `${nameFirstLetter}${surnameFirstLetter}`;
  }
  return '';
};
