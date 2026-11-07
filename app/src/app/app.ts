import { Component, signal } from '@angular/core';
import { CONTATOS_TESTE } from './contatos.teste';

@Component({
  selector: 'app-root',
  template: `
    <main class="home">
      <section class="home-panel" aria-labelledby="page-title">
        <h1 id="page-title">{{ title() }}</h1>

        @if (tela() === 'inicio') {
          <p class="status" role="status">Funções em desenvolvimento</p>
          <nav class="actions" aria-label="Funcionalidades">
            <button type="button" data-action="contatos" (click)="abrirContatos()">
              Contatos
            </button>
            <button type="button" data-action="avisos" disabled>
              Avisos
            </button>
          </nav>
        } @else {
          <h2>Contatos</h2>
          <p class="warning" role="alert">Dados fictícios — não faça ligações</p>

          <ul class="contact-list" aria-label="Lista de contatos fictícios">
            @for (contato of contatos; track contato.nome) {
              <li class="contact-item">
                <strong>{{ contato.nome }}</strong>
                <span>{{ contato.telefone }}</span>
                <small>{{ contato.fonte }}</small>
              </li>
            }
          </ul>

          <button type="button" class="back-button" (click)="voltarAoInicio()">
            Voltar ao início
          </button>
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

    .back-button {
      width: 100%;
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
  protected readonly title = signal('Apoio do bairro');
  protected readonly tela = signal<'inicio' | 'contatos'>('inicio');
  protected readonly contatos = CONTATOS_TESTE;

  protected abrirContatos(): void {
    this.tela.set('contatos');
  }

  protected voltarAoInicio(): void {
    this.tela.set('inicio');
  }
}
