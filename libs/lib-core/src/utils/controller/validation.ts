/* eslint-disable @typescript-eslint/no-unused-vars */
import { ValidationError } from 'class-validator';

type ValidationErrorSimple = {
  property: string;
  messages: string[];
};

export function extractValidationErrors(
  errors: ValidationError[],
  lang: 'fr' | 'en' = 'en',
): ValidationErrorSimple[] {
  // Dictionnaire de traduction pour les contraintes courantes (adapter selon besoins)
  const traductionMessages: Record<string, { fr: string; en: string }> = {
    isString: {
      fr: 'Le champ {property} doit être une chaîne de caractères.',
      en: '{property} must be a string.',
    },
    isNotEmpty: {
      fr: 'Le champ {property} ne peut pas être vide.',
      en: '{property} should not be empty.',
    },
    // ajouter ici d’autres contraintes si besoin
  };

  const result: ValidationErrorSimple[] = [];

  function recurse(errors: ValidationError[]) {
    for (const error of errors) {
      if (error.constraints) {
        const messages: string[] = [];
        for (const [key, msg] of Object.entries(error.constraints)) {
          if (traductionMessages[key]) {
            // Message traduit en remplaçant {property}
            const translated = traductionMessages[key][lang].replace(
              '{property}',
              error.property,
            );
            messages.push(translated);
          } else {
            // Sinon message brut (souvent en anglais)
            messages.push(msg);
          }
        }
        result.push({ property: error.property, messages });
      }
      if (error.children && error.children.length > 0) {
        recurse(error.children);
      }
    }
  }

  recurse(errors);
  return result;
}
