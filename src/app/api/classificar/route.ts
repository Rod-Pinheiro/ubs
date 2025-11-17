import { NextRequest, NextResponse } from 'next/server';
import { calcularClassificacao } from '@/lib/classification';
import { FormData } from '@/lib/types';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    const classifications = await prisma.classification.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      take: 50, // Limit to last 50 classifications
    });

    return NextResponse.json(classifications);
  } catch (error) {
    console.error('Erro ao buscar classificações:', error);
    return NextResponse.json(
      { error: 'Erro interno ao buscar classificações' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: FormData = await request.json();

    const resultado = calcularClassificacao(body);

    // Save to database
    const savedClassification = await prisma.classification.create({
      data: {
        dor: JSON.parse(JSON.stringify(body.dor)),
        exames: JSON.parse(JSON.stringify(body.exames)),
        respiratorio: JSON.parse(JSON.stringify(body.respiratorio)),
        estomago: JSON.parse(JSON.stringify(body.estomago)),
        prenatal: JSON.parse(JSON.stringify(body.prenatal)),
        crianca: JSON.parse(JSON.stringify(body.crianca)),
        pontuacaoFinal: resultado.pontuacaoFinal,
        categoria: resultado.categoria,
        descricao: resultado.descricao,
        acao: resultado.acao,
        detalhes: JSON.parse(JSON.stringify(resultado.detalhes)),
      },
    });

    return NextResponse.json({
      ...resultado,
      id: savedClassification.id,
      createdAt: savedClassification.createdAt,
    });
  } catch (error) {
    console.error('Erro ao processar classificação:', error);
    return NextResponse.json(
      { error: 'Erro interno ao processar classificação' },
      { status: 500 }
    );
  }
}