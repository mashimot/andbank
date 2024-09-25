import { AsyncPipe, JsonPipe, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize, Observable, switchMap, tap } from 'rxjs';
import { RendaFixaFilterComponent } from '../../components/renda-fixa-filter/renda-fixa-filter.component';
import { RendaFixaListComponent } from '../../components/renda-fixa-list/renda-fixa-list.component';
import { IRendaFixaSpinner } from '../../models/renda-fixa-spinner';
import { IRendaFixa, IRendaFixaFilter } from '../../models/renda-fixa';
import { RendaFixaService } from './../../services/renda-fixa.service';

@Component({
  selector: 'app-renda-fixa',
  standalone: true,
  imports: [
    NgIf,
    AsyncPipe,
    JsonPipe,
    MatSnackBarModule,
    RendaFixaListComponent,
    RendaFixaFilterComponent
  ],
  templateUrl: './renda-fixa.component.html',
  styleUrl: './renda-fixa.component.scss'
})
export class RendaFixaComponent implements OnInit {
  private rendaFixaService = inject(RendaFixaService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private snackBar = inject(MatSnackBar);

  public rendaFixa$!: Observable<IRendaFixa[]>;
  public filter!: IRendaFixaFilter;
  public spinner: IRendaFixaSpinner = {
    rendaFixa: false
  }

  ngOnInit(): void {
    this.rendaFixa$ = this.listenQueryParamsChange();
  }

  listenQueryParamsChange(): Observable<IRendaFixa[]> {
    return this
      .activatedRoute
      .queryParams
      .pipe(
        tap(queryParams => this.spinner.rendaFixa = true),
        switchMap(queryParams => {
          return this.rendaFixaService.getAll(queryParams).pipe(
            finalize(() => {
              this.filter = queryParams;
              this.spinner.rendaFixa = false
            })
          )
        })
      );
  }

  public onCreateRendaFixaChange(): void {
    this.router.navigate(['renda-fixa', 'create']);
  }

  public onDetailRendaFixaChange(rendaFixa: IRendaFixa): void {
    this.router.navigate(['renda-fixa', rendaFixa.id]);
  }

  public onSaveRendaFixaChange(rendaFixa: IRendaFixa): void {
    this.router.navigate(['renda-fixa', rendaFixa.id, 'edit']);
  }

  public onDeleteRendaFixaChange(rendaFixa: IRendaFixa): void {
    this.spinner.rendaFixa = true;
    this.rendaFixa$ = this.rendaFixaService.destroy(rendaFixa.id).pipe(
      switchMap(queryParams => {
        return this.rendaFixaService.getAll(this.filter).pipe(
          tap(response => {
            this.snackBar.open(
              `[#${rendaFixa.id} - ${rendaFixa.descricao}] deleted!`,
              'x',
              {
                horizontalPosition: 'center',
                verticalPosition: 'top'
              }
            );
          })
        )
      }),
      finalize(() => this.spinner.rendaFixa = false)
    );
  }

  public onSearchRendaFixaChange(value: IRendaFixaFilter): void {
    this.filter = value;
    this.router.navigate(['renda-fixa'], { queryParams: this.filter });
  }
}
