export interface IRendaFixaCreate {
    descricao: string;
    dataValidade: string;
    investimentoMinimo: number;
    tipoProdutoId: number;
    indexadorId: number;
}

export interface IRendaFixaSave {
    id: number;
    descricao: string;
    dataValidade: string;
    investimentoMinimo: number;
    tipoProdutoId: number;
    indexadorId: number;
}

export interface IRendaFixa {
    id: number;
    descricao: string;
    dataValidade: string;
    investimentoMinimo: number;
    tipoProdutoId: number;
    indexadorId: number;
    tipoProduto: {
        id: number;
        nome: string;
    };
    indexador: {
        id: number;
        nome: string;
    };
}

export interface IRendaFixaFilter {
    Id?: number;
    Descricao?: string;
    TipoProdutoId?: number;
    IndexadorId?: number;
}
