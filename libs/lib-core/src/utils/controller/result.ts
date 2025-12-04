export class ErrorResponse {
  statusCode: number;
  errors: any[] = [];

  constructor(error: any) {
    this.statusCode = this.getStatusCode(error);
    this.errors = this.getErrors(error);
  }

  private getStatusCode(error: any) {
    if (this.isInvalidJsonBodyError(error)) {
      return 422;
    }

    if (this.isMongoIdCastError(error)) {
      return 400;
    }

    if (this.isInvalidErrorCode(error.code)) {
      return 500;
    }

    if (this.isDuplicatekeyError(error.code)) {
      return 409;
    }

    const firstThreeDigits = error.code.toString().substring(0, 3);
    return Number(firstThreeDigits);
  }

  private getErrors(error: any) {
    const errors = [];

    if (error.details && Array.isArray(error.details)) {
      error.details.forEach((e: any) => {
        errors.push(this.getSingleError(e));
      });
    } else {
      errors.push(this.getSingleError(error));
    }

    return errors;
  }

  private getSingleError(error: any) {
    if (this.isInvalidJsonBodyError(error)) {
      return {
        code: 422_000,
        clean_message: 'Les données envoyées sont malformées',
        message: 'Les données envoyées sont malformées',
      };
    }

    if (this.isMongoIdCastError(error)) {
      return {
        code: 400_330,
        clean_message: "L'id est invalide",
        message: `L'id est invalide : ${error.value}`,
      };
    }

    if (this.isInvalidErrorCode(error.code)) {
      Object.assign(error, { code: 500_000 });
    }

    return {
      code: error.code,
      clean_message:
        error.clean_message ??
        'Une erreur est survenue. Veuillez réessayer plus tard',
      message: error.message ?? 'Une erreur est survenue',
    };
  }

  private isInvalidJsonBodyError(err: any) {
    return err instanceof SyntaxError;
  }

  private isDuplicatekeyError(err: any) {
    return err.code === 11000;
  }

  private isMongoIdCastError(err: any) {
    return err.name === 'CastError';
  }

  private isInvalidErrorCode(code: any) {
    return typeof code !== 'number' || code < 400_000 || code >= 600_000;
  }
}
