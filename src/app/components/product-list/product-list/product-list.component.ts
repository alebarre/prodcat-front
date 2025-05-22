import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ProductDTO } from '../../../model/Product';
import { ProductService } from '../../../service/product.service';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule,
    MatRadioModule,
    HttpClientModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    FormsModule,
  ],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  displayedColumns = [
    'name',
    'description',
    'price',
    'categoryPath',
    'available',
  ];
  dataSource: ProductDTO[] = [];
  filterValue = '';
  selectedAvailability: any;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadData();
  }

  categories: string[] = [];
  selectedCategory: string = '';

  ngAfterViewInit(): void {
    this.productService.getCategories().subscribe((cats: string[]) => {
      this.categories = cats;
    });
  }

  onCategoryChange(): void {
    this.loadData();
  }

  loadData(): void {
    this.productService
      .list(this.filterValue)
      .subscribe((data) => (this.dataSource = data));
  }

  applyFilter(): void {
    this.loadData();
    if (this.selectedCategory) {
      const selectedCategoryFirstWord = this.selectedCategory.split(' ')[0];
      this.productService.list(this.filterValue).subscribe((data) => {
        this.dataSource = data.filter(
          (product) =>
            product.categoryPath.split(' ')[0] === selectedCategoryFirstWord
        );
      });
    }
  }

  applyRadioFilter(): void {
    this.loadData();
    if (
      this.selectedAvailability !== undefined &&
      this.selectedAvailability !== null &&
      this.selectedAvailability !== 'All'
    ) {
      this.productService.list(this.filterValue).subscribe((data) => {
        this.dataSource = data.filter(
          (product) =>
            product.available === (this.selectedAvailability === 'true')
        );
      });
    }

    if (this.selectedAvailability === '') {
      this.loadData();
    }
  }
}
