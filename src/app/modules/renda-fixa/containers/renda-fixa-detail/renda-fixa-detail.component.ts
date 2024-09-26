import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, of, shareReplay, switchMap } from 'rxjs';
import { IRendaFixa } from '../../models/renda-fixa';
import { RendaFixaService } from '../../services/renda-fixa.service';
import { AsyncPipe, JsonPipe, Location, NgIf } from '@angular/common';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-renda-fixa-detail',
  standalone: true,
  imports: [
    NgIf,
    AsyncPipe,
    JsonPipe,
    FlexLayoutModule,
    MatButtonModule
  ],
  templateUrl: './renda-fixa-detail.component.html',
  styleUrl: './renda-fixa-detail.component.scss'
})
export class RendaFixaDetailComponent {
  private rendaFixaService = inject(RendaFixaService)
  private activatedRoute = inject(ActivatedRoute);
  private location = inject(Location);

  public rendaFixa$?: Observable<IRendaFixa | null | undefined>;

  ngOnInit(): void {
    this.rendaFixa$ = this.getRendaFixa()
  }

  btnVoltar(): void {
    this.location.back();
  }

  private getRendaFixa(): Observable<IRendaFixa | null | undefined> {
    return this
      .activatedRoute
      .paramMap
      .pipe(
        map(paramMap => Number(paramMap.get('id'))),
        switchMap(id => {
          return id
            ? this.rendaFixaService.getRendaFixaById(id)
            : of(null);
        }),
        shareReplay(1)
      );
  }
}
