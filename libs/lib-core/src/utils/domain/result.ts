interface ErrorFormatter {
  code: number;
  clean_message: string;
  message: string;
  message_en?: string;
}

export class ErrorResult extends Error {
  details: ErrorFormatter[] = [];
  code: number;

  constructor(error: ErrorFormatter[] | ErrorFormatter) {
    super();

    this.details = [].concat(error).map((e) => ({
      code: e.code,
      clean_message: e.clean_message,
      message: e.message,
      message_en: e.message_en,
    }));

    this.code = this.details[0].code;
  }
}

export class SuccessResult<T> {
  data: T;
  message?: string;
  message_en?: string;

  constructor({
    data,
    message,
    message_en,
  }: {
    data: T;
    message: string;
    message_en?: string;
  }) {
    this.message = message;
    this.message_en = message_en;
    this.data = data;
  }

  getMessage(lang: 'fr' | 'en' = 'fr'): string | undefined {
    if (lang === 'fr') {
      return this.message;
    }
    return this.message_en || this.message;
  }
}
