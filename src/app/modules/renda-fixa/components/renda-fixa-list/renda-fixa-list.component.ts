import { AsyncPipe, CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { IRendaFixa } from '../../models/renda-fixa';
import { IRendaFixaSpinner } from '../../models/renda-fixa-spinner';

@Component({
  selector: 'app-renda-fixa-list',
  standalone: true,
  imports: [
    AsyncPipe,
    CurrencyPipe,
    DatePipe,
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FlexLayoutModule
  ],
  templateUrl: './renda-fixa-list.component.html',
  styleUrl: './renda-fixa-list.component.scss'
})
export class RendaFixaListComponent implements OnInit, OnChanges {

  @Input() rendaFixa?: IRendaFixa[] | null;
  @Input() spinner?: IRendaFixaSpinner;

  @Output() createRendaFixa: EventEmitter<void> = new EventEmitter();
  @Output() deleteRendaFixa: EventEmitter<IRendaFixa> = new EventEmitter();
  @Output() saveRendaFixa: EventEmitter<IRendaFixa> = new EventEmitter();
  @Output() detailRendaFixa: EventEmitter<IRendaFixa> = new EventEmitter();

  @ViewChild(MatPaginator) paginator?: MatPaginator;

  public displayedColumns: string[] = ['id', 'descricao', 'dataValidade', 'investimentoMinimo', 'produto', 'indexador', 'action'];
  public dataSource = new MatTableDataSource<IRendaFixa>(this.rendaFixa || []);


  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    const rendaFixa = changes['rendaFixa']?.currentValue;

    if (rendaFixa) {
      this.dataSource = new MatTableDataSource<IRendaFixa>(rendaFixa || []);
    }
  }

  ngOnInit(): void {
  }

  create(): void {
    this.createRendaFixa.emit();
  }

  delete(rendaFixa: IRendaFixa, index: number): void {
    this.deleteRendaFixa.emit(rendaFixa);
  }

  update(rendaFixa: IRendaFixa): void {
    this.saveRendaFixa.emit(rendaFixa);
  }

  detail(rendaFixa: IRendaFixa): void {
    this.detailRendaFixa.emit(rendaFixa);
  }
}