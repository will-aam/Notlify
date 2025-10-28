// Biblioteca de dados mock para o sistema Notlify

export interface Item {
  id: string;
  nome: string;
  fornecedor: string;
  quantidade: number;
  custoUnitario: number;
  custoAnterior: number;
  precoVenda: number;
  markupDesejado: number;
  markupPraticado: number;
  variacao: number;
  valorTotal: number;
  dataAtualizacao: Date;
  status: 'normal' | 'alerta' | 'critico';
}

export interface Fornecedor {
  id: string;
  nome: string;
  cnpj: string;
  totalComprado: number;
  tempoMedioEntrega: number;
  favorito: boolean;
  ultimaCompra: Date;
  totalItens: number;
}

export interface Documento {
  id: string;
  tipo: 'NF-e' | 'Espelho';
  numero: string;
  fornecedor: string;
  dataEmissao: Date;
  valorTotal: number;
  itens: number;
  status: 'processado' | 'pendente' | 'erro';
}

export const mockItems: Item[] = [
  {
    id: '1',
    nome: 'Parafuso Sextavado M8 x 30mm',
    fornecedor: 'Parafusos São Paulo Ltda',
    quantidade: 500,
    custoUnitario: 0.85,
    custoAnterior: 0.75,
    precoVenda: 1.50,
    markupDesejado: 30,
    markupPraticado: 76.47,
    variacao: 13.33,
    valorTotal: 425.00,
    dataAtualizacao: new Date('2025-10-25'),
    status: 'alerta',
  },
  {
    id: '2',
    nome: 'Arruela Lisa M8 Zincada',
    fornecedor: 'Metalúrgica Horizonte',
    quantidade: 1000,
    custoUnitario: 0.12,
    custoAnterior: 0.15,
    precoVenda: 0.25,
    markupDesejado: 30,
    markupPraticado: 108.33,
    variacao: -20.00,
    valorTotal: 120.00,
    dataAtualizacao: new Date('2025-10-26'),
    status: 'normal',
  },
  {
    id: '3',
    nome: 'Porca Sextavada M8',
    fornecedor: 'Parafusos São Paulo Ltda',
    quantidade: 800,
    custoUnitario: 0.18,
    custoAnterior: 0.16,
    precoVenda: 0.35,
    markupDesejado: 30,
    markupPraticado: 94.44,
    variacao: 12.50,
    valorTotal: 144.00,
    dataAtualizacao: new Date('2025-10-24'),
    status: 'alerta',
  },
  {
    id: '4',
    nome: 'Cabo Elétrico 2,5mm² Preto (metro)',
    fornecedor: 'Distribuidora Elétrica Nacional',
    quantidade: 300,
    custoUnitario: 3.20,
    custoAnterior: 2.80,
    precoVenda: 5.50,
    markupDesejado: 30,
    markupPraticado: 71.88,
    variacao: 14.29,
    valorTotal: 960.00,
    dataAtualizacao: new Date('2025-10-27'),
    status: 'alerta',
  },
  {
    id: '5',
    nome: 'Interruptor Simples 10A Branco',
    fornecedor: 'Distribuidora Elétrica Nacional',
    quantidade: 150,
    custoUnitario: 4.50,
    custoAnterior: 4.50,
    precoVenda: 8.90,
    markupDesejado: 30,
    markupPraticado: 97.78,
    variacao: 0.00,
    valorTotal: 675.00,
    dataAtualizacao: new Date('2025-10-23'),
    status: 'normal',
  },
  {
    id: '6',
    nome: 'Tomada 2P+T 10A Branca',
    fornecedor: 'Distribuidora Elétrica Nacional',
    quantidade: 200,
    custoUnitario: 5.80,
    custoAnterior: 5.20,
    precoVenda: 10.50,
    markupDesejado: 30,
    markupPraticado: 81.03,
    variacao: 11.54,
    valorTotal: 1160.00,
    dataAtualizacao: new Date('2025-10-28'),
    status: 'alerta',
  },
  {
    id: '7',
    nome: 'Lâmpada LED 9W Branca Fria',
    fornecedor: 'Iluminação Total',
    quantidade: 100,
    custoUnitario: 8.50,
    custoAnterior: 9.00,
    precoVenda: 15.90,
    markupDesejado: 30,
    markupPraticado: 87.06,
    variacao: -5.56,
    valorTotal: 850.00,
    dataAtualizacao: new Date('2025-10-22'),
    status: 'normal',
  },
  {
    id: '8',
    nome: 'Fita Isolante 19mm x 20m Preta',
    fornecedor: 'Distribuidora Elétrica Nacional',
    quantidade: 250,
    custoUnitario: 3.80,
    custoAnterior: 3.40,
    precoVenda: 6.90,
    markupDesejado: 30,
    markupPraticado: 81.58,
    variacao: 11.76,
    valorTotal: 950.00,
    dataAtualizacao: new Date('2025-10-26'),
    status: 'alerta',
  },
  {
    id: '9',
    nome: 'Cano PVC 3/4" (6 metros)',
    fornecedor: 'Tubos e Conexões Ltda',
    quantidade: 80,
    custoUnitario: 18.50,
    custoAnterior: 16.00,
    precoVenda: 28.90,
    markupDesejado: 30,
    markupPraticado: 56.22,
    variacao: 15.63,
    valorTotal: 1480.00,
    dataAtualizacao: new Date('2025-10-28'),
    status: 'critico',
  },
  {
    id: '10',
    nome: 'Joelho PVC 90° 3/4"',
    fornecedor: 'Tubos e Conexões Ltda',
    quantidade: 300,
    custoUnitario: 1.20,
    custoAnterior: 1.10,
    precoVenda: 2.20,
    markupDesejado: 30,
    markupPraticado: 83.33,
    variacao: 9.09,
    valorTotal: 360.00,
    dataAtualizacao: new Date('2025-10-25'),
    status: 'normal',
  },
  {
    id: '11',
    nome: 'Registro Esfera 3/4"',
    fornecedor: 'Tubos e Conexões Ltda',
    quantidade: 50,
    custoUnitario: 22.00,
    custoAnterior: 18.50,
    precoVenda: 35.00,
    markupDesejado: 30,
    markupPraticado: 59.09,
    variacao: 18.92,
    valorTotal: 1100.00,
    dataAtualizacao: new Date('2025-10-27'),
    status: 'critico',
  },
  {
    id: '12',
    nome: 'Cimento Portland CP-II 50kg',
    fornecedor: 'Material de Construção Silva',
    quantidade: 100,
    custoUnitario: 28.50,
    custoAnterior: 27.00,
    precoVenda: 42.90,
    markupDesejado: 30,
    markupPraticado: 50.53,
    variacao: 5.56,
    valorTotal: 2850.00,
    dataAtualizacao: new Date('2025-10-24'),
    status: 'normal',
  },
  {
    id: '13',
    nome: 'Areia Média (m³)',
    fornecedor: 'Material de Construção Silva',
    quantidade: 15,
    custoUnitario: 85.00,
    custoAnterior: 80.00,
    precoVenda: 125.00,
    markupDesejado: 30,
    markupPraticado: 47.06,
    variacao: 6.25,
    valorTotal: 1275.00,
    dataAtualizacao: new Date('2025-10-23'),
    status: 'normal',
  },
  {
    id: '14',
    nome: 'Tijolo Cerâmico 6 Furos',
    fornecedor: 'Cerâmica Boa Vista',
    quantidade: 2000,
    custoUnitario: 0.65,
    custoAnterior: 0.58,
    precoVenda: 1.10,
    markupDesejado: 30,
    markupPraticado: 69.23,
    variacao: 12.07,
    valorTotal: 1300.00,
    dataAtualizacao: new Date('2025-10-26'),
    status: 'alerta',
  },
  {
    id: '15',
    nome: 'Tinta Acrílica Branca 18L',
    fornecedor: 'Tintas e Cores Premium',
    quantidade: 30,
    custoUnitario: 145.00,
    custoAnterior: 130.00,
    precoVenda: 220.00,
    markupDesejado: 30,
    markupPraticado: 51.72,
    variacao: 11.54,
    valorTotal: 4350.00,
    dataAtualizacao: new Date('2025-10-28'),
    status: 'alerta',
  },
  {
    id: '16',
    nome: 'Massa Corrida 25kg',
    fornecedor: 'Tintas e Cores Premium',
    quantidade: 40,
    custoUnitario: 38.00,
    custoAnterior: 35.00,
    precoVenda: 58.90,
    markupDesejado: 30,
    markupPraticado: 55.00,
    variacao: 8.57,
    valorTotal: 1520.00,
    dataAtualizacao: new Date('2025-10-27'),
    status: 'normal',
  },
  {
    id: '17',
    nome: 'Rolo de Pintura 23cm Espuma',
    fornecedor: 'Tintas e Cores Premium',
    quantidade: 150,
    custoUnitario: 6.20,
    custoAnterior: 5.80,
    precoVenda: 11.50,
    markupDesejado: 30,
    markupPraticado: 85.48,
    variacao: 6.90,
    valorTotal: 930.00,
    dataAtualizacao: new Date('2025-10-25'),
    status: 'normal',
  },
  {
    id: '18',
    nome: 'Pincel 2" Cerdas Naturais',
    fornecedor: 'Tintas e Cores Premium',
    quantidade: 100,
    custoUnitario: 8.50,
    custoAnterior: 8.00,
    precoVenda: 14.90,
    markupDesejado: 30,
    markupPraticado: 75.29,
    variacao: 6.25,
    valorTotal: 850.00,
    dataAtualizacao: new Date('2025-10-24'),
    status: 'normal',
  },
  {
    id: '19',
    nome: 'Argamassa AC-II 20kg',
    fornecedor: 'Material de Construção Silva',
    quantidade: 60,
    custoUnitario: 18.90,
    custoAnterior: 16.50,
    precoVenda: 28.50,
    markupDesejado: 30,
    markupPraticado: 50.79,
    variacao: 14.55,
    valorTotal: 1134.00,
    dataAtualizacao: new Date('2025-10-28'),
    status: 'alerta',
  },
  {
    id: '20',
    nome: 'Rejunte Cinza 1kg',
    fornecedor: 'Material de Construção Silva',
    quantidade: 200,
    custoUnitario: 5.50,
    custoAnterior: 5.20,
    precoVenda: 9.90,
    markupDesejado: 30,
    markupPraticado: 80.00,
    variacao: 5.77,
    valorTotal: 1100.00,
    dataAtualizacao: new Date('2025-10-26'),
    status: 'normal',
  },
  {
    id: '21',
    nome: 'Porta de Madeira Lisa 80x210cm',
    fornecedor: 'Madeireira Central',
    quantidade: 10,
    custoUnitario: 280.00,
    custoAnterior: 250.00,
    precoVenda: 450.00,
    markupDesejado: 30,
    markupPraticado: 60.71,
    variacao: 12.00,
    valorTotal: 2800.00,
    dataAtualizacao: new Date('2025-10-27'),
    status: 'alerta',
  },
  {
    id: '22',
    nome: 'Fechadura Interna Cromada',
    fornecedor: 'Ferragens Premium',
    quantidade: 25,
    custoUnitario: 42.00,
    custoAnterior: 38.00,
    precoVenda: 68.90,
    markupDesejado: 30,
    markupPraticado: 64.05,
    variacao: 10.53,
    valorTotal: 1050.00,
    dataAtualizacao: new Date('2025-10-25'),
    status: 'alerta',
  },
  {
    id: '23',
    nome: 'Dobradiça 3" Cromada',
    fornecedor: 'Ferragens Premium',
    quantidade: 100,
    custoUnitario: 8.90,
    custoAnterior: 8.50,
    precoVenda: 15.90,
    markupDesejado: 30,
    markupPraticado: 78.65,
    variacao: 4.71,
    valorTotal: 890.00,
    dataAtualizacao: new Date('2025-10-23'),
    status: 'normal',
  },
];

export const mockFornecedores: Fornecedor[] = [
  {
    id: '1',
    nome: 'Parafusos São Paulo Ltda',
    cnpj: '12.345.678/0001-90',
    totalComprado: 89450.50,
    tempoMedioEntrega: 3,
    favorito: true,
    ultimaCompra: new Date('2025-10-25'),
    totalItens: 45,
  },
  {
    id: '2',
    nome: 'Metalúrgica Horizonte',
    cnpj: '23.456.789/0001-81',
    totalComprado: 45230.00,
    tempoMedioEntrega: 5,
    favorito: false,
    ultimaCompra: new Date('2025-10-26'),
    totalItens: 18,
  },
  {
    id: '3',
    nome: 'Distribuidora Elétrica Nacional',
    cnpj: '34.567.890/0001-72',
    totalComprado: 128900.75,
    tempoMedioEntrega: 2,
    favorito: true,
    ultimaCompra: new Date('2025-10-28'),
    totalItens: 68,
  },
  {
    id: '4',
    nome: 'Iluminação Total',
    cnpj: '45.678.901/0001-63',
    totalComprado: 34500.00,
    tempoMedioEntrega: 4,
    favorito: false,
    ultimaCompra: new Date('2025-10-22'),
    totalItens: 22,
  },
  {
    id: '5',
    nome: 'Tubos e Conexões Ltda',
    cnpj: '56.789.012/0001-54',
    totalComprado: 76890.00,
    tempoMedioEntrega: 3,
    favorito: true,
    ultimaCompra: new Date('2025-10-28'),
    totalItens: 38,
  },
  {
    id: '6',
    nome: 'Material de Construção Silva',
    cnpj: '67.890.123/0001-45',
    totalComprado: 156700.50,
    tempoMedioEntrega: 1,
    favorito: true,
    ultimaCompra: new Date('2025-10-28'),
    totalItens: 92,
  },
  {
    id: '7',
    nome: 'Cerâmica Boa Vista',
    cnpj: '78.901.234/0001-36',
    totalComprado: 52300.00,
    tempoMedioEntrega: 7,
    favorito: false,
    ultimaCompra: new Date('2025-10-26'),
    totalItens: 15,
  },
  {
    id: '8',
    nome: 'Tintas e Cores Premium',
    cnpj: '89.012.345/0001-27',
    totalComprado: 98450.00,
    tempoMedioEntrega: 2,
    favorito: true,
    ultimaCompra: new Date('2025-10-28'),
    totalItens: 54,
  },
  {
    id: '9',
    nome: 'Madeireira Central',
    cnpj: '90.123.456/0001-18',
    totalComprado: 67800.00,
    tempoMedioEntrega: 5,
    favorito: false,
    ultimaCompra: new Date('2025-10-27'),
    totalItens: 28,
  },
  {
    id: '10',
    nome: 'Ferragens Premium',
    cnpj: '01.234.567/0001-09',
    totalComprado: 42100.00,
    tempoMedioEntrega: 4,
    favorito: false,
    ultimaCompra: new Date('2025-10-25'),
    totalItens: 31,
  },
];

export const mockDocumentos: Documento[] = [
  {
    id: '1',
    tipo: 'NF-e',
    numero: '000123456',
    fornecedor: 'Parafusos São Paulo Ltda',
    dataEmissao: new Date('2025-10-25'),
    valorTotal: 2340.50,
    itens: 8,
    status: 'processado',
  },
  {
    id: '2',
    tipo: 'NF-e',
    numero: '000234567',
    fornecedor: 'Distribuidora Elétrica Nacional',
    dataEmissao: new Date('2025-10-28'),
    valorTotal: 5680.00,
    itens: 12,
    status: 'processado',
  },
  {
    id: '3',
    tipo: 'Espelho',
    numero: 'ESP-2025-10-001',
    fornecedor: 'Material de Construção Silva',
    dataEmissao: new Date('2025-10-24'),
    valorTotal: 8950.00,
    itens: 15,
    status: 'processado',
  },
  {
    id: '4',
    tipo: 'NF-e',
    numero: '000345678',
    fornecedor: 'Tintas e Cores Premium',
    dataEmissao: new Date('2025-10-28'),
    valorTotal: 12340.00,
    itens: 18,
    status: 'processado',
  },
  {
    id: '5',
    tipo: 'NF-e',
    numero: '000456789',
    fornecedor: 'Tubos e Conexões Ltda',
    dataEmissao: new Date('2025-10-27'),
    valorTotal: 4560.00,
    itens: 10,
    status: 'pendente',
  },
];

// Função auxiliar para obter itens com aumento de custo > 10%
export const getItensComAumentoCusto = (): Item[] => {
  return mockItems.filter(item => item.variacao > 10);
};

// Função auxiliar para obter itens com markup negativo ou muito baixo
export const getItensComMarkupBaixo = (): Item[] => {
  return mockItems.filter(item => item.markupPraticado < item.markupDesejado || item.markupPraticado < 0);
};

// Função auxiliar para obter os 5 itens mais recentes
export const getItensRecentes = (limite: number = 5): Item[] => {
  return [...mockItems]
    .sort((a, b) => b.dataAtualizacao.getTime() - a.dataAtualizacao.getTime())
    .slice(0, limite);
};

// Função auxiliar para obter dados do gráfico (top 5 itens por valor)
export const getTopItensParaGrafico = () => {
  return [...mockItems]
    .sort((a, b) => b.valorTotal - a.valorTotal)
    .slice(0, 5)
    .map(item => ({
      nome: item.nome.substring(0, 20) + (item.nome.length > 20 ? '...' : ''),
      custoAtual: item.custoUnitario,
      custoAnterior: item.custoAnterior,
      variacao: item.variacao,
    }));
};

// Função auxiliar para exportar CSV
export const exportToCSV = (items: Item[], filename: string = 'items.csv') => {
  const headers = [
    'ID',
    'Nome',
    'Fornecedor',
    'Quantidade',
    'Custo Unitário',
    'Custo Anterior',
    'Preço Venda',
    'Markup Desejado (%)',
    'Markup Praticado (%)',
    'Variação (%)',
    'Valor Total',
    'Data Atualização',
    'Status',
  ];

  const rows = items.map(item => [
    item.id,
    item.nome,
    item.fornecedor,
    item.quantidade,
    item.custoUnitario.toFixed(2),
    item.custoAnterior.toFixed(2),
    item.precoVenda.toFixed(2),
    item.markupDesejado.toFixed(2),
    item.markupPraticado.toFixed(2),
    item.variacao.toFixed(2),
    item.valorTotal.toFixed(2),
    item.dataAtualizacao.toLocaleDateString('pt-BR'),
    item.status,
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.join(',')),
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
