import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Fashion } from '../classes/Fashion';
import { FashionAPIService } from '../services/fashion-apiservice';

@Component({
  selector: 'app-fashion-detail-component',
  standalone: false,
  templateUrl: './fashion-detail-component.html',
  styleUrl: './fashion-detail-component.css',
})
export class FashionDetailComponent implements OnInit {
  fashion = signal<Fashion | null>(null);
  errMessage = signal('');
  selectedId = '';

  constructor(
    private _service: FashionAPIService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((param) => {
      const slug = param.get('slug');
      if (slug) {
        this.showBySlug(slug);
      }
    });
  }

  searchFashion(idOrSlug: string) {
    this.fashion.set(null);
    this.errMessage.set('');
    const raw = (idOrSlug || '').trim();
    if (!raw) {
      this.errMessage.set('Please enter a valid Fashion slug or IdF.');
      return;
    }

    const idFromSlug = Fashion.extractIdFromSlug(raw);
    const idToSearch = idFromSlug ?? Number(raw);

    if (!Number.isFinite(idToSearch) || Number(idToSearch) <= 0) {
      this.errMessage.set('Fashion not found. Please check the slug or idF.');
      return;
    }

    this.selectedId = String(idToSearch);
    this._service.getFashion(this.selectedId).subscribe({
      next: (data) => {
        if (!data) {
          this.errMessage.set('Fashion not found.');
          return;
        }
        const fashionInstance = Object.assign(new Fashion(), data);
        this.fashion.set(fashionInstance);
      },
      error: (err) => {
        this.errMessage.set(err);
      },
    });
  }

  showBySlug(slug: string) {
    const id = Fashion.extractIdFromSlug(slug);
    if (id == null) {
      this.errMessage.set('Invalid Fashion slug.');
      return;
    }
    this.searchFashion(String(id));
  }

  goToList() {
    this.router.navigate(['/fashion-list']);
  }
}
