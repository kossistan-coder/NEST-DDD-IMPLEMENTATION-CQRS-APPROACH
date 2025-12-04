import { ErrorResult } from '../domain/result';

export class ControllerFlashMessage {
  static setFlash(
    error: any,
    lang: 'fr' | 'en' = 'fr',
    fn: (msg: string) => void | null,
  ) {
    if (error instanceof ErrorResult) {
      const msg = (error as ErrorResult).details
        .map((e) => {
          if (fn) {
            if (lang === 'fr') {
              fn(e.clean_message);
            } else {
              fn(e.message_en);
            }
          }
          return lang === 'fr' ? e.clean_message : e.message_en || e.message;
        })
        .join(' -- ');

      return msg;
    }

    if (error instanceof Error) {
      if (fn) {
        fn(error.message);
      }
      return error.message;
    }

    return `Une erreur inconne s'est produite.`;
  }
}
