import { NextRequest, NextResponse } from 'next/server';
import { calcularClassificacao } from '@/lib/classification';
import { FormData } from '@/lib/types';

export async function POST(request: NextRequest) {
  try {
    const body: FormData = await request.json();
    
    const resultado = calcularClassificacao(body);
    
    return NextResponse.json(resultado);
  } catch (error) {
    console.error('Erro ao processar classificação:', error);
    return NextResponse.json(
      { error: 'Erro interno ao processar classificação' },
      { status: 500 }
    );
  }
}