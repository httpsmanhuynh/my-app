export class Fashion {
  constructor(
    public _id: any = null,
    public idF?: number,
    public style: string = '',
    public fashion_subject: string = '',
    public fashion_detail: string = '',
    public fashion_image: string = '',
    public createdAt?: Date,
  ) {}

  static normalizeText(value: string): string {
    return (value || '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  static buildSlug(subject: string, idF?: number): string {
    const base = Fashion.normalizeText(subject);
    if (!base) return '';
    return idF != null && !Number.isNaN(Number(idF)) ? `${base}-f${idF}` : base;
  }

  static extractIdFromSlug(slug: string): number | null {
    if (!slug) return null;
    const match = slug.match(/-f(\d+)$/i);
    return match ? Number(match[1]) : null;
  }

  get slug(): string {
    return Fashion.buildSlug(this.fashion_subject, this.idF);
  }

  getBase64string() {
    if (!this.fashion_image) return '';
    if (!this.fashion_image.startsWith('data:image')) {
      return 'data:image/png;base64,' + this.fashion_image;
    }
    return this.fashion_image;
  }
}
