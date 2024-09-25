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
	FormGroup,
	ReactiveFormsModule
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
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
		FlexLayoutModule
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
	}

	ngOnChanges(changes: SimpleChanges) {
		const searchFilter = changes['searchFilter']?.currentValue;

		if (!this.searchForm) {
			this.searchForm = this.buildSearchForm();
		}

		if (searchFilter) {
			this.searchForm.patchValue(searchFilter || {}, { emitEvent: false })
		}
	}

	buildSearchForm(): FormGroup {
		return this.formBuilder.group({
			Id: [''],
			Descricao: [''],
			TipoProdutoId: [''],
			IndexadorId: ['']
		});
	}

	clear(): void {
		this.searchForm.reset();
	}
	
	onSubmit(): void {
		this.search.emit(this.searchForm.value);
	}
}