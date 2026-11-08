export interface ContatoTeste {
  nome: string;
  telefone: string;
  fonte: string;
}

export const CONTATOS_TESTE: readonly ContatoTeste[] = [
  {
    nome: 'Central Sol',
    telefone: '(00) 0000-0001',
    fonte: 'Fonte de demonstração',
  },
  {
    nome: 'Apoio da Praça Sol',
    telefone: '(00) 0000-0002',
    fonte: 'Fonte de demonstração',
  },
];
