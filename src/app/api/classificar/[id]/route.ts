import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    console.log('PATCH request for ID:', id);
    const body = await request.json();
    console.log('Request body:', body);
    const { processed, processedBy } = body;

    if (!id) {
      console.log('ID is missing');
      return NextResponse.json(
        { error: 'ID da classificação é obrigatório' },
        { status: 400 }
      );
    }

    const updateData: any = {
      processed: processed ?? false,
      updatedAt: new Date(),
    };

    if (processed && processedBy) {
      updateData.processedAt = new Date();
      updateData.processedBy = processedBy;
    } else if (!processed) {
      updateData.processedAt = null;
      updateData.processedBy = null;
    }

    console.log('Updating classification with ID:', id, 'data:', updateData);
    const updatedClassification = await prisma.classification.update({
      where: { id },
      data: updateData,
    });
    console.log('Update successful:', updatedClassification);

    return NextResponse.json(updatedClassification);
  } catch (error) {
    console.error('Erro ao atualizar status:', error);
    return NextResponse.json(
      { error: 'Erro interno ao atualizar status' },
      { status: 500 }
    );
  }
}