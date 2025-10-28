import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'Nenhum arquivo enviado' },
        { status: 400 }
      );
    }

    const mockExtractedData = {
      fornecedor: 'Distribuidora Elétrica Nacional',
      data: new Date().toLocaleDateString('pt-BR'),
      numeroNF: '000567890',
      itens: [
        {
          id: '1',
          nome: 'Cabo Elétrico 2,5mm² Preto',
          quantidade: 500,
          custoUnitario: 3.20,
          valorTotal: 1600.00,
        },
        {
          id: '2',
          nome: 'Interruptor Simples 10A',
          quantidade: 100,
          custoUnitario: 4.50,
          valorTotal: 450.00,
        },
        {
          id: '3',
          nome: 'Tomada 2P+T 10A',
          quantidade: 150,
          custoUnitario: 5.80,
          valorTotal: 870.00,
        },
        {
          id: '4',
          nome: 'Lâmpada LED 9W',
          quantidade: 200,
          custoUnitario: 8.50,
          valorTotal: 1700.00,
        },
        {
          id: '5',
          nome: 'Fita Isolante 19mm',
          quantidade: 300,
          custoUnitario: 3.80,
          valorTotal: 1140.00,
        },
      ],
    };

    return NextResponse.json(mockExtractedData);
  } catch (error) {
    console.error('Erro ao processar upload:', error);
    return NextResponse.json(
      { error: 'Erro ao processar arquivo' },
      { status: 500 }
    );
  }
}
