import { FormControl } from '@angular/forms';

// custom validator
// if contains words return error object (invalid) else null (valid)
 export function restrictedWords(words) {

  return (control: FormControl): { [key: string]: any } => {

    if (!words) return null;

    let invalidWords = words
      .map(w => control.value.includes(w) ? w : null)
      .filter(w => w != null);

    return invalidWords && invalidWords.length > 0
      ? { 'restrictedWords': invalidWords.join(', ') }
      : null;
  };
}
