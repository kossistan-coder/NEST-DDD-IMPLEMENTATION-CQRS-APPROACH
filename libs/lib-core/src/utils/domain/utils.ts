export class Utils {
  static slugify(designation: string): string {
    const slug = designation
      .normalize('NFD') // Supprime les accents
      .replace(/[\u0300-\u036f]/g, '') // Retire les diacritiques
      .toLowerCase() // Met en minuscule
      .replace(/\s+/g, '-') // Remplace espaces par tirets
      .replace(/[^a-z0-9-]/g, ''); // Supprime les caractères spéciaux

    return slug;
  }

  static concatWithDash(left: string, right: string): string {
    return `${left.trim()} – ${right.trim()}`;
  }
}
