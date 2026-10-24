import { Component, OnInit } from '@angular/core';
import { Fashion } from '../classes/Fashion';
import { FashionAPIService } from '../services/fashion-apiservice';

export interface FashionSearchResult {
  fashion: Fashion;
  similarity: number;
}

@Component({
  selector: 'app-search-fashion',
  standalone: false,
  templateUrl: './search-fashion.html',
  styleUrl: './search-fashion.css',
})
export class SearchFashionComponent implements OnInit {
  keyword: string = '';
  searchField: 'fashion_subject' | 'fashion_detail' = 'fashion_subject';
  algorithm: 'cosine' | 'jaccard' = 'cosine';
  limit: number = 10;

  allFashions: Fashion[] = [];
  searchResults: FashionSearchResult[] = [];
  isSearched: boolean = false;
  errMessage: string = '';

  constructor(private _service: FashionAPIService) {}

  ngOnInit(): void {
    // Tải trước toàn bộ danh sách Fashion
    this._service.getFashions().subscribe({
      next: (data: any[]) => {
        this.allFashions = data.map((item, index) => {
          const f = Object.assign(new Fashion(), item);
          if (!f.idF) f.idF = index + 1;
          return f;
        });
      },
      error: (err) => {
        this.errMessage = 'Lỗi kết nối máy chủ: ' + (err.message || err);
      },
    });
  }

  // --- THUẬT TOÁN TIỀN XỬ LÝ CHUỖI ---
  private tokenize(text: string): string[] {
    if (!text) return [];
    return text
      .toLowerCase()
      .replace(
        /[^a-z0-9a-záàảãạăắằẳẵặâấầẩẫậéèẻẽẹêếềểễệíìỉĩịóòỏõọôốồổỗộơớờởỡợúùủũụưứừửữựýỳỷỹỵđ\s]/gi,
        ' ',
      )
      .trim()
      .split(/\s+/)
      .filter((w) => w.length > 0);
  }

  // --- THUẬT TOÁN 1: COSINE SIMILARITY ---
  private calculateCosine(str1: string, str2: string): number {
    const tokens1 = this.tokenize(str1);
    const tokens2 = this.tokenize(str2);

    if (tokens1.length === 0 || tokens2.length === 0) return 0;

    const freq1: { [key: string]: number } = {};
    const freq2: { [key: string]: number } = {};
    const allWords = new Set<string>();

    tokens1.forEach((w) => {
      freq1[w] = (freq1[w] || 0) + 1;
      allWords.add(w);
    });

    tokens2.forEach((w) => {
      freq2[w] = (freq2[w] || 0) + 1;
      allWords.add(w);
    });

    let dotProduct = 0;
    let norm1 = 0;
    let norm2 = 0;

    allWords.forEach((w) => {
      const v1 = freq1[w] || 0;
      const v2 = freq2[w] || 0;
      dotProduct += v1 * v2;
      norm1 += v1 * v1;
      norm2 += v2 * v2;
    });

    if (norm1 === 0 || norm2 === 0) return 0;
    return dotProduct / (Math.sqrt(norm1) * Math.sqrt(norm2));
  }

  // --- THUẬT TOÁN 2: JACCARD SIMILARITY ---
  private calculateJaccard(str1: string, str2: string): number {
    const set1 = new Set(this.tokenize(str1));
    const set2 = new Set(this.tokenize(str2));

    if (set1.size === 0 || set2.size === 0) return 0;

    let intersectionCount = 0;
    set1.forEach((w) => {
      if (set2.has(w)) intersectionCount++;
    });

    const unionCount = new Set([...set1, ...set2]).size;
    return unionCount === 0 ? 0 : intersectionCount / unionCount;
  }

  // --- HÀM TÌM KIẾM CHÍNH ---
  onSearch(): void {
    this.isSearched = true;
    if (!this.keyword.trim()) {
      this.searchResults = [];
      return;
    }

    const calculated: FashionSearchResult[] = this.allFashions.map((f) => {
      const targetText =
        this.searchField === 'fashion_subject' ? f.fashion_subject : f.fashion_detail;
      const score =
        this.algorithm === 'cosine'
          ? this.calculateCosine(this.keyword, targetText)
          : this.calculateJaccard(this.keyword, targetText);

      return {
        fashion: f,
        similarity: parseFloat(score.toFixed(4)), // làm tròn 4 số thập phân
      };
    });

    // 1. Sắp xếp giảm dần theo Similarity
    calculated.sort((a, b) => b.similarity - a.similarity);

    // 2. Giới hạn số lượng hiển thị theo lựa chọn
    this.searchResults = calculated.slice(0, Number(this.limit));
  }

  // --- HÀM TÔ MÀU THEO ĐÚNG YÊU CẦU ĐỀ BÀI ---
  // + [0.75 -> 1]: Nền vàng + chữ đỏ
  // + [0.5 -> 0.75): Nền hồng + chữ xanh
  // + < 0.5: Nền đỏ + chữ trắng
  getRowStyleClass(sim: number): string {
    if (sim >= 0.75 && sim <= 1) {
      return 'row-yellow-red';
    } else if (sim >= 0.5 && sim < 0.75) {
      return 'row-pink-blue';
    } else {
      return 'row-red-white';
    }
  }
}
