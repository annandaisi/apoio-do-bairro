export interface AvisoTeste {
  titulo: string;
  texto: string;
  data: string;
  fonte: string;
  verificado: boolean;
}

export const AVISOS_TESTE: readonly AvisoTeste[] = [
  {
    titulo: 'Mutirão de limpeza da praça',
    texto: 'No sábado pela manhã, moradores podem apoiar a limpeza coletiva da Praça Sol.',
    data: '2026-11-07',
    fonte: 'Fonte de demonstração — associação local fictícia',
    verificado: true,
  },
  {
    titulo: 'Horário ampliado do posto móvel',
    texto: 'O posto móvel terá atendimento ampliado apenas para os períodos informados pela organização responsável.',
    data: '2026-11-05',
    fonte: 'Fonte de demonstração — equipe fictícia da Central Sol',
    verificado: true,
  },
];
