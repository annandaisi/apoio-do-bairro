import { Component, inject, signal } from '@angular/core';
import { CONTATOS_TESTE } from './contatos.teste';
import { AvisoTeste } from './avisos.teste';
import { DadosService } from './dados.service';

@Component({
  selector: 'app-root',
  template: `
    <main class="home">
      <section class="home-panel" aria-labelledby="page-title">
        <h1 id="page-title">{{ title() }}</h1>

        @if (tela() === 'inicio') {
          <nav class="actions" aria-label="Funcionalidades">
            <button type="button" data-action="contatos" (click)="abrirContatos()">
              Contatos
            </button>
            <button type="button" data-action="avisos" (click)="abrirAvisos()">
              Avisos
            </button>
          </nav>
        } @else if (tela() === 'contatos') {
          <h2>Contatos</h2>
          <p class="warning" role="alert">Dados fictícios — não faça ligações</p>

          <ul class="contact-list" aria-label="Lista de contatos fictícios">
            @for (contato of contatos; track contato.nome) {
              <li class="contact-item">
                <strong>{{ contato.nome }}</strong>
                <span>{{ contato.telefone }}</span>
                <small>{{ contato.fonte }}</small>
                <button
                  type="button"
                  class="open-button"
                  [attr.data-open-contact]="contato.nome"
                  (click)="abrirContato(contato)"
                >
                  Abrir
                </button>
              </li>
            }
          </ul>

          <button type="button" class="back-button" (click)="voltarAoInicio()">
            Voltar ao início
          </button>
        } @else if (tela() === 'contato') {
          <p class="selected-label">Contato selecionado</p>
          <p class="warning" role="alert">Dados fictícios — não faça ligações</p>

          <div class="selected-contact" aria-live="polite">
            <strong>{{ contatoSelecionado()?.nome }}</strong>
            <span>{{ contatoSelecionado()?.telefone }}</span>
            <small>{{ contatoSelecionado()?.fonte }}</small>
          </div>

          <button type="button" class="back-button" (click)="voltarALista()">
            Voltar à lista
          </button>
        } @else if (tela() === 'avisos-carregando') {
          <p class="loading" role="status">Carregando avisos verificados...</p>
        } @else if (tela() === 'avisos-erro') {
          <h2>Não foi possível carregar os avisos</h2>
          <p class="warning" role="alert">Erro simples ao acessar os dados.</p>
          <button type="button" class="back-button" (click)="abrirAvisos()">Tentar novamente</button>
          <button type="button" class="back-button secondary" (click)="voltarAoInicio()">Voltar ao início</button>
        } @else if (tela() === 'avisos-vazio') {
          <h2>Avisos</h2>
          <p class="empty" role="status">Nenhum aviso verificado disponível.</p>
          <button type="button" class="back-button" (click)="voltarAoInicio()">Voltar ao início</button>
        } @else if (tela() === 'avisos') {
          <h2>Avisos</h2>
          <p class="source-note" role="note">{{ fonteAvisos() }}</p>
          <ul class="notice-list" aria-label="Lista de avisos verificados">
            @for (aviso of avisos(); track aviso.titulo) {
              <li class="notice-item">
                <strong>{{ aviso.titulo }}</strong>
                <small>{{ formatarData(aviso.data) }} · {{ aviso.fonte }}</small>
                <button type="button" [attr.data-open-aviso]="aviso.titulo" (click)="abrirAviso(aviso)">
                  Abrir
                </button>
              </li>
            }
          </ul>
          <button type="button" class="back-button" (click)="voltarAoInicio()">Voltar ao início</button>
        } @else {
          <p class="selected-label">Aviso verificado</p>
          <div class="selected-notice" aria-live="polite">
            <h2>{{ avisoSelecionado()?.titulo }}</h2>
            <p>{{ avisoSelecionado()?.texto }}</p>
            <small>{{ formatarData(avisoSelecionado()?.data) }} · {{ avisoSelecionado()?.fonte }}</small>
          </div>
          <button type="button" class="back-button" (click)="voltarAListaAvisos()">Voltar à lista</button>
        }
      </section>
    </main>
  `,
  styles: `
    :host {
      display: block;
      min-height: 100dvh;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      color: #17212b;
      background: #f2f7f5;
    }

    .home {
      box-sizing: border-box;
      min-height: 100dvh;
      display: grid;
      place-items: center;
      padding: 24px;
    }

    .home-panel {
      width: min(100%, 520px);
      box-sizing: border-box;
      text-align: center;
      background: #ffffff;
      border: 2px solid #d3e0dc;
      border-radius: 8px;
      padding: clamp(32px, 8vw, 48px) 24px;
    }

    h1 {
      margin: 0;
      font-size: clamp(2rem, 8vw, 3rem);
      line-height: 1.1;
      letter-spacing: 0;
    }

    h2 {
      margin: 20px 0 12px;
      font-size: clamp(1.5rem, 6vw, 2rem);
      letter-spacing: 0;
    }

    .status {
      margin: 20px 0 28px;
      font-size: clamp(1.125rem, 4vw, 1.35rem);
      font-weight: 700;
      color: #5b3218;
    }

    .warning {
      margin: 0 0 20px;
      font-size: clamp(1rem, 4vw, 1.125rem);
      font-weight: 800;
      color: #7a2d18;
      line-height: 1.4;
    }

    .actions {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 12px;
    }

    button {
      min-width: 44px;
      min-height: 44px;
      box-sizing: border-box;
      border: 2px solid #155f50;
      border-radius: 6px;
      padding: 14px 18px;
      background: #155f50;
      color: #ffffff;
      font: inherit;
      font-size: clamp(1.1rem, 4vw, 1.25rem);
      font-weight: 800;
      cursor: pointer;
      opacity: 1;
    }

    button[disabled] {
      background: #dce8e4;
      color: #31433e;
      border-color: #718680;
      cursor: not-allowed;
    }

    .contact-list {
      display: grid;
      gap: 12px;
      margin: 0 0 20px;
      padding: 0;
      list-style: none;
      text-align: left;
    }

    .contact-item {
      display: grid;
      gap: 6px;
      min-height: 44px;
      box-sizing: border-box;
      border: 2px solid #d3e0dc;
      border-radius: 6px;
      padding: 16px;
      background: #f8fbfa;
      font-size: clamp(1rem, 4vw, 1.125rem);
    }

    .contact-item strong {
      font-size: clamp(1.125rem, 4vw, 1.25rem);
    }

    .contact-item small {
      color: #53635e;
      font-size: 1rem;
      font-weight: 700;
    }

    .open-button,
    .back-button {
      width: 100%;
      min-height: 44px;
    }

    .open-button {
      margin-top: 8px;
      font-size: 1rem;
      padding-block: 10px;
    }

    .selected-label {
      margin: 20px 0 12px;
      font-size: clamp(1.25rem, 5vw, 1.5rem);
      font-weight: 800;
    }

    .selected-contact {
      display: grid;
      gap: 8px;
      margin-bottom: 20px;
      border: 2px solid #d3e0dc;
      border-radius: 6px;
      padding: 20px 16px;
      background: #f8fbfa;
      font-size: clamp(1rem, 4vw, 1.125rem);
    }

    .selected-contact strong {
      font-size: clamp(1.25rem, 5vw, 1.5rem);
    }

    .selected-contact small {
      color: #53635e;
      font-size: 1rem;
      font-weight: 700;
    }

    button:focus-visible {
      outline: 4px solid #f2b705;
      outline-offset: 3px;
    }

    button.secondary {
      margin-top: 12px;
      background: #ffffff;
      color: #155f50;
    }

    .loading,
    .empty {
      margin: 24px 0;
      font-size: clamp(1.125rem, 4vw, 1.35rem);
      font-weight: 800;
    }

    .source-note {
      margin: 0 0 16px;
      color: #53635e;
      font-size: 1rem;
      font-weight: 700;
    }

    .notice-list {
      display: grid;
      gap: 12px;
      margin: 0 0 20px;
      padding: 0;
      list-style: none;
      text-align: left;
    }

    .notice-item {
      display: grid;
      gap: 8px;
      border: 2px solid #d3e0dc;
      border-radius: 6px;
      padding: 16px;
      background: #f8fbfa;
    }

    .notice-item strong {
      font-size: clamp(1.125rem, 4vw, 1.25rem);
    }

    .notice-item small {
      color: #53635e;
      font-size: 0.95rem;
      font-weight: 700;
    }

    .notice-item button {
      width: 100%;
      min-height: 44px;
    }

    .selected-notice {
      margin-bottom: 20px;
      border: 2px solid #d3e0dc;
      border-radius: 6px;
      padding: 16px;
      background: #f8fbfa;
      text-align: left;
    }

    .selected-notice h2 {
      margin: 0 0 12px;
    }

    .selected-notice p {
      margin: 0 0 16px;
      line-height: 1.55;
    }

    .selected-notice small {
      color: #53635e;
      font-size: 0.95rem;
      font-weight: 700;
    }

    @media (max-width: 420px) {
      .home {
        align-items: start;
        padding: 16px;
      }

      .actions {
        grid-template-columns: 1fr;
      }

      button {
        width: 100%;
      }
    }
  `
})
export class App {
  private readonly dados = inject(DadosService);

  protected readonly title = signal('Apoio do bairro');
  protected readonly tela = signal<'inicio' | 'contatos' | 'contato' | 'avisos-carregando' | 'avisos' | 'avisos-vazio' | 'avisos-erro' | 'aviso-detalhe'>('inicio');
  protected readonly contatos = CONTATOS_TESTE;
  protected readonly contatoSelecionado = signal<(typeof CONTATOS_TESTE)[number] | null>(null);
  protected readonly avisos = signal<readonly AvisoTeste[]>([]);
  protected readonly avisoSelecionado = signal<AvisoTeste | null>(null);
  protected readonly fonteAvisos = signal('Dados fictícios — não conectado ao Supabase');

  protected abrirContatos(): void {
    this.tela.set('contatos');
  }

  protected abrirContato(contato: (typeof CONTATOS_TESTE)[number]): void {
    this.contatoSelecionado.set(contato);
    this.tela.set('contato');
  }

  protected abrirAvisos(): void {
    this.tela.set('avisos-carregando');
    this.dados.avisos().subscribe({
      next: (resultado) => {
        const verificados = resultado.avisos.filter((aviso) => aviso.verificado);
        this.avisos.set(verificados);
        this.fonteAvisos.set(
          resultado.origem === 'supabase'
            ? 'Avisos verificados recebidos do Supabase'
            : 'Dados fictícios — não conectado ao Supabase',
        );
        this.tela.set(verificados.length > 0 ? 'avisos' : 'avisos-vazio');
      },
      error: () => this.tela.set('avisos-erro'),
    });
  }

  protected abrirAviso(aviso: AvisoTeste): void {
    if (!aviso.verificado) {
      return;
    }
    this.avisoSelecionado.set(aviso);
    this.tela.set('aviso-detalhe');
  }

  protected voltarAoInicio(): void {
    this.contatoSelecionado.set(null);
    this.avisoSelecionado.set(null);
    this.tela.set('inicio');
  }

  protected voltarALista(): void {
    this.contatoSelecionado.set(null);
    this.tela.set('contatos');
  }

  protected voltarAListaAvisos(): void {
    this.avisoSelecionado.set(null);
    this.tela.set(this.avisos().length > 0 ? 'avisos' : 'avisos-vazio');
  }

  protected formatarData(data?: string): string {
    if (!data) {
      return '';
    }
    const [ano, mes, dia] = data.slice(0, 10).split('-');
    return `${dia}/${mes}/${ano}`;
  }
}
