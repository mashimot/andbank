import { AsyncPipe, JsonPipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { finalize, map, Observable, of, shareReplay, switchMap, tap } from 'rxjs';
import { IIndexador } from '../../../indexador/models/indexador';
import { ITipoProduto } from '../../../tipo-produto/models/tipo-produto';
import { TipoProdutoService } from '../../../tipo-produto/services/tipo-produto.service';
import { RendaFixaFormComponent } from '../../components/renda-fixa-form/renda-fixa-form.component';
import { IRendaFixa, IRendaFixaCreate, IRendaFixaSave } from '../../models/renda-fixa';
import { IRendaFixaSpinner } from '../../models/renda-fixa-spinner';
import { IndexadorService } from './../../../indexador/services/indexador.service';
import { RendaFixaService } from './../../services/renda-fixa.service';

@Component({
	selector: 'app-renda-fixa-create-edit',
	standalone: true,
	imports: [
		AsyncPipe,
		JsonPipe,
		NgIf,
		MatSnackBarModule,
		RendaFixaFormComponent,
	],
	templateUrl: './renda-fixa-create-edit.component.html',
	styleUrl: './renda-fixa-create-edit.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class RendaFixaCreateEditComponent implements OnInit {
	private rendaFixaService = inject(RendaFixaService);
	private tipoProdutoService = inject(TipoProdutoService);
	private indexadorService = inject(IndexadorService);
	private activatedRoute = inject(ActivatedRoute);
	private snackBar = inject(MatSnackBar);

	public rendaFixa$!: Observable<IRendaFixa | null | undefined>;
	public tipoProduto$!: Observable<ITipoProduto[]>;
	public indexadores$!: Observable<IIndexador[]>;
	public spinner: IRendaFixaSpinner = {
		tipoProduto: false,
		rendaFixa: false,
		indexador: false
	};
	public isEdit: boolean = true;

	ngOnInit(): void {
		this.rendaFixa$ = this.getRendaFixa();
		this.tipoProduto$ = this.getTipoProduto();
	}

	public getTipoProduto(): Observable<ITipoProduto[]> {
		this.spinner.tipoProduto = true;
		return this.tipoProdutoService.tipoProduto().pipe(
			finalize(() => this.spinner.tipoProduto = false)
		);
	}

	public onTipoProdutoFormChange(tipoProdutoId: number): void {
		if (tipoProdutoId) {
			this.spinner.indexador = true;
			this.indexadores$ = this.indexadorService.indexadores(tipoProdutoId).pipe(
				finalize(() => this.spinner.indexador = false)
			)
		}
	}

	public onSaveRendaFixaFormChange(rendaFixa: IRendaFixaSave): void {
		this.spinner.save = true;
		this.rendaFixaService.update(rendaFixa)
			.pipe(
				finalize(() => this.spinner.save = false)
			)
			.subscribe(
				next => {
					this.snackBar.open(
						`[#${rendaFixa.id} - ${rendaFixa.descricao}] updated!`,
						'x',
						{
							horizontalPosition: 'center',
							verticalPosition: 'top'
						}
					);
				}
			);
	}


	public onCreateRendaFixaFormChange(rendaFixa: IRendaFixaCreate): void {
		this.spinner.create = true;
		this.rendaFixaService.store(rendaFixa)
			.pipe(
				finalize(() => this.spinner.create = false)
			)
			.subscribe(
				next => {
					this.snackBar.open(
						`[${rendaFixa.descricao}] created!`,
						'x',
						{
							horizontalPosition: 'center',
							verticalPosition: 'top'
						}
					);
				}
			);
	}

	private getRendaFixa(): Observable<IRendaFixa | null | undefined> {
		this.spinner.rendaFixa = true;

		return this
			.activatedRoute
			.paramMap
			.pipe(
				tap(paramMap => {
					this.isEdit = paramMap.has('id');
				}),
				map(paramMap => Number(paramMap.get('id'))),
				switchMap(id => {
					return id
						? this.rendaFixaService.getRendaFixaById(id).pipe(
							finalize(() => this.spinner.rendaFixa = false)
						)
						: of(null).pipe(
							finalize(() => this.spinner.rendaFixa = false)
						)
				}),
				shareReplay(1)
			);
	}

}
