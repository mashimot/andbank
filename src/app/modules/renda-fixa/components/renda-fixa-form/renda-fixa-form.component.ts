import { DatePipe, JsonPipe, NgFor, NgIf } from '@angular/common';
import {
	Component,
	EventEmitter,
	inject,
	Input,
	OnInit,
	Output,
	SimpleChanges
} from '@angular/core';
import {
	AbstractControl,
	FormArray,
	FormBuilder,
	FormControl,
	FormGroup,
	ReactiveFormsModule,
	Validators
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { NativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { IIndexador } from '../../../indexador/models/indexador';
import { ITipoProduto } from '../../../tipo-produto/models/tipo-produto';
import { IRendaFixa, IRendaFixaCreate, IRendaFixaSave } from '../../models/renda-fixa';
import { IRendaFixaSpinner } from '../../models/renda-fixa-spinner';

@Component({
	selector: 'app-renda-fixa-form',
	templateUrl: './renda-fixa-form.component.html',
	styleUrls: ['./renda-fixa-form.component.scss'],
	standalone: true,
	providers: [
		DatePipe,
		provideNativeDateAdapter(),
	],
	imports: [
		ReactiveFormsModule,
		JsonPipe,
		NgIf,
		NgFor,
		MatFormFieldModule,
		MatInputModule,
		MatSelectModule,
		MatDatepickerModule,
		MatButtonModule,
		MatIconModule,
		MatProgressSpinnerModule,
		FlexLayoutModule,
		NgxMaskDirective,
		NgxMaskPipe,
		NativeDateModule
	]
})
export class RendaFixaFormComponent implements OnInit {
	@Input() isEdit?: boolean;
	@Input() public rendaFixa?: IRendaFixa | null;
	@Input() public tipoProduto?: ITipoProduto[] | null;
	@Input() public indexadores?: IIndexador[] | null;
	@Input() public spinner: IRendaFixaSpinner = {
		tipoProduto: false,
		indexador: false,
		rendaFixa: false
	};

	@Output() public saveRendaFixaChange: EventEmitter<IRendaFixaSave> = new EventEmitter();
	@Output() public createRendaFixaChange: EventEmitter<IRendaFixaCreate> = new EventEmitter();
	@Output() public tipoProdutoChange: EventEmitter<number> = new EventEmitter();

	private formBuilder = inject(FormBuilder)
	private datePipe!: DatePipe;

	form!: FormGroup;
	formSubmitAttempt: boolean = false;

	constructor(
	) {
		this.datePipe = new DatePipe('pt-BR');
	}

	ngOnInit(): void {
	}

	public buildForm(): FormGroup {
		return this.formBuilder.group({
			"id": ['', []],
			"descricao": ['', [Validators.required, Validators.maxLength(100)]],
			"dataValidade": ['', [Validators.required]],
			"investimentoMinimo": ['', [Validators.required]],
			"tipoProdutoId": ['', [Validators.required]],
			"indexadorId": ['', [Validators.required]],
		});
	}

	listenForInputChanges(): void {
		this.tipoProdutoId.valueChanges.subscribe(
			value => {
				this.indexadorId.setValue("", { emitEvent: false });
				this.tipoProdutoChange.emit(value);
			}
		);
	}

	ngOnChanges(changes: SimpleChanges): void {
		const rendaFixa = changes['rendaFixa']?.currentValue as IRendaFixa;

		if (!this.form) {
			this.form = this.buildForm();
			this.listenForInputChanges();
		}

		if (rendaFixa) {
			this.displayRendaFixa(rendaFixa);
		}
	}

	public displayRendaFixa(rendaFixa: IRendaFixa): void {
		this.f.reset();
		this.f.patchValue({ ...rendaFixa });
	}

	btnVoltar(): void {

	}

	onSubmit(): void {
		if (this.f.valid) {
			const rendaFixa = {
				...this.f.value,
				dataValidade: this.datePipe.transform(this.dataValidade.value, 'yyyy-MM-dd')
			};

			if (!this.rendaFixa && this.isEdit === false) {
				this.createRendaFixaChange.emit(rendaFixa);
			} else {
				this.saveRendaFixaChange.emit({
					...rendaFixa,
					id: this.id.value
				});
			}
		} else {
			this.validateAllFormFields(this.f);
		}
	}

	validateAllFormFields(control: AbstractControl): void {
		if (control instanceof FormControl) {
			control.markAsTouched({
				onlySelf: true
			});
		} else if (control instanceof FormGroup) {
			Object.keys(control.controls).forEach((field: string) => {
				const groupControl = control.get(field)!;
				this.validateAllFormFields(groupControl);
			});
		} else if (control instanceof FormArray) {
			const controlAsFormArray = control as FormArray;
			controlAsFormArray.controls.forEach((arrayControl: AbstractControl) => this.validateAllFormFields(arrayControl));
		}
	}

	isFieldValid(formControl: FormControl): boolean {
		return formControl?.invalid && formControl?.touched;
	}

	get f(): FormGroup {
		return this.form as FormGroup;
	}

	get id(): FormControl {
		return this.f.get(['id']) as FormControl;
	}

	get descricao(): FormControl {
		return this.f.get(['descricao']) as FormControl;
	}

	get dataValidade(): FormControl {
		return this.f.get(['dataValidade']) as FormControl;
	}

	get investimentoMinimo(): FormControl {
		return this.f.get(['investimentoMinimo']) as FormControl;
	}

	get tipoProdutoId(): FormControl {
		return this.f.get(['tipoProdutoId']) as FormControl;
	}

	get indexadorId(): FormControl {
		return this.f.get(['indexadorId']) as FormControl;
	}
}