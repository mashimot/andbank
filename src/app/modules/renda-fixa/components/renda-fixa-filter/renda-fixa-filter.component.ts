import { JsonPipe, NgFor, NgIf } from '@angular/common';
import {
	Component,
	EventEmitter,
	inject,
	Input,
	OnChanges,
	OnInit,
	Output,
	SimpleChanges
} from '@angular/core';
import {
	FormBuilder,
	FormControl,
	FormGroup,
	ReactiveFormsModule,
	Validators
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { rangeValidator } from '../../../../validators/number.validator';
import { IRendaFixaFilter } from '../../models/renda-fixa';

@Component({
	selector: 'app-renda-fixa-filter',
	templateUrl: './renda-fixa-filter.component.html',
	styleUrls: ['./renda-fixa-filter.component.scss'],
	standalone: true,
	imports: [
		ReactiveFormsModule,
		JsonPipe,
		NgIf,
		NgFor,
		MatFormFieldModule,
		MatInputModule,
		MatSelectModule,
		MatButtonModule,
		MatIconModule,
		MatProgressSpinnerModule,
		FlexLayoutModule,
		NgxMaskDirective,
		NgxMaskPipe,
	]
})
export class RendaFixaFilterComponent implements OnInit, OnChanges {
	@Input() searchFilter?: IRendaFixaFilter | null;

	@Output() search: EventEmitter<IRendaFixaFilter> = new EventEmitter();

	private formBuilder = inject(FormBuilder)

	public searchForm!: FormGroup;

	constructor(
	) { }

	ngOnInit(): void {
		this.searchForm = this.buildSearchForm();
	}

	ngOnChanges(changes: SimpleChanges) {
		const searchFilter = changes['searchFilter']?.currentValue;

		// if (!this.searchForm) {
		// 	this.searchForm = this.buildSearchForm();
		// }

		if (searchFilter) {
			this.searchForm.patchValue(searchFilter || {}, { emitEvent: false })
		}
	}

	buildSearchForm(): FormGroup {
		return this.formBuilder.group({
			Id: ['', [rangeValidator(1, 9999)]],
			Descricao: ['', [Validators.maxLength(100)]],
			TipoProdutoId: ['', [rangeValidator(1, 9999)]],
			IndexadorId: ['', [rangeValidator(1, 9999)]]
		});
	}

	clear(): void {
		this.searchForm.reset();
	}

	onSubmit(): void {
		this.search.emit(this.searchForm.value);
	}

	isFieldValid(formControl: FormControl): boolean {
		return formControl?.invalid && formControl?.touched;
	}

	get f(): FormGroup {
		return this.searchForm as FormGroup;
	}

	get id(): FormControl {
		return this.f.get(['Id']) as FormControl;
	}
	get descricao(): FormControl {
		return this.f.get(['Descricao']) as FormControl;
	}
	get tipoProdutoId(): FormControl {
		return this.f.get(['TipoProdutoId']) as FormControl;
	}
	get indexadorId(): FormControl {
		return this.f.get(['IndexadorId']) as FormControl;
	}
}