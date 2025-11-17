# Sistema de Classificação de Risco Ambulatorial

Aplicação Next.js completa para classificação de risco ambulatorial baseada em regras de negócio específicas.

## 🚀 Funcionalidades

- **Formulário Dinâmico**: 6 categorias de sintomas com validação em tempo real
- **Pontuação Automática**: Cálculo instantâneo de pontos por categoria
- **Classificação Inteligente**: Usa o MAIOR valor entre todas as categorias
- **Interface Visual**: Cores distintas para cada nível de risco
- **API RESTful**: Endpoint `/api/classificar` para integração
- **Design Responsivo**: Funciona em desktop e mobile

## 🎯 Regras de Negócio Implementadas

### Categorias de Pontuação
1. **Dor** (0-3 pontos)
2. **Exames/Renovação** (0-3 pontos)  
3. **Sintomas Respiratórios** (0-3 pontos)
4. **Estômago/Intestino** (0-3 pontos)
5. **Pré-natal** (0-3 pontos)
6. **Criança < 2 anos** (0-3 pontos)

### Classificação Final
- 🔴 **3 pontos** → URGÊNCIA
- 🟡 **1-2 pontos** → ACESSO AVANÇADO  
- 🟢 **1 ponto específico** → CUIDADO CONTINUADO

## 🛠️ Tecnologias

- **Next.js 16** com App Router
- **TypeScript** para tipagem segura
- **Tailwind CSS** para estilização
- **React Hooks** para estado

## 📁 Estrutura do Projeto

```
src/
├── app/
│   ├── api/classificar/route.ts    # API backend
│   ├── page.tsx                    # Página principal
│   └── layout.tsx                  # Layout global
├── components/
│   ├── forms/                      # Formulários por categoria
│   └── ResultCard.tsx              # Card de resultados
└── lib/
    ├── classification.ts           # Lógica de negócio
    └── types.ts                    # Tipos TypeScript
```

## 🚀 Como Executar

```bash
# Instalar dependências
npm install

# Iniciar desenvolvimento
npm run dev

# Construir para produção
npm run build
```

Acesse `http://localhost:3000` para usar a aplicação.

## 📊 Exemplo de Uso da API

### Request
```json
POST /api/classificar
{
  "dor": { "intensidade": 8, "temFebre": true, "sintomasGraves": false },
  "exames": { "veioBem": false, "hipertensoDiabeticoReceitaAntiga": false, "alteracaoNaQueixa": true, "doencaGrave": false, "precisaPrioridade": false },
  "respiratorio": { "tosseLeve": false, "temFebre": false, "temCatarro": false, "faltaAr": false, "chiado": false, "esforcoRespirar": false },
  "estomago": { "enjooDiarreiaLeve": false, "dorForteConstante": false, "vomitosRepetidos": false, "sangue": false, "febreAlta": false },
  "prenatal": { "tudoBem": false, "riscoModerado": false, "sinaisAlarme": false },
  "crianca": { "menor2Anos": false, "rotinaSemSintomas": false, "sintomasLeves": false, "sintomasGraves": false }
}
```

### Response
```json
{
  "pontuacaoFinal": 2,
  "categoria": "ACESSO AVANÇADO",
  "descricao": "Atendimento prioritário nas próximas horas",
  "acao": "Agendar consulta médica em até 24 horas",
  "detalhes": {
    "dor": 2,
    "exames": 2,
    "respiratorio": 0,
    "estomago": 0,
    "prenatal": 0,
    "crianca": 0
  }
}
```

## ✅ Testes Realizados

- ✅ Build sem erros
- ✅ API funcional com exemplos
- ✅ Cálculo correto de pontuação
- ✅ Classificação adequada (Urgência/Acesso Avançado)
- ✅ Interface responsiva
- ✅ Validação dinâmica funcionando

## 🎨 Interface

- **Vermelho**: Urgência (3 pontos)
- **Amarelo**: Acesso Avançado (1-2 pontos)
- **Verde**: Cuidado Continuado (1 ponto específico)
- **Cinza**: Sem classificação

O sistema está pronto para uso em ambiente de produção!