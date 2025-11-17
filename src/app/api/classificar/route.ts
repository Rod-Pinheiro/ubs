import { NextRequest, NextResponse } from 'next/server';
import { calcularClassificacao } from '@/lib/classification';
import { FormData } from '@/lib/types';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const classifications = await prisma.classification.findMany({
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        dor: true,
        exames: true,
        respiratorio: true,
        estomago: true,
        prenatal: true,
        crianca: true,
        pontuacaoFinal: true,
        categoria: true,
        descricao: true,
        acao: true,
        detalhes: true,
        processed: true,
        processedAt: true,
        processedBy: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Debug: Check what Prisma returns
    console.log('Raw classification:', classifications[0]);
    console.log('Processed value:', classifications[0]?.processed);
    console.log('Processed type:', typeof classifications[0]?.processed);

    // Ensure processed field is properly handled
    const safeClassifications = classifications.map((classification: any) => ({
      ...classification,
      processed: classification.processed === true,
    }));

    console.log('After processing:', safeClassifications[0]?.processed);

    return NextResponse.json(safeClassifications);
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