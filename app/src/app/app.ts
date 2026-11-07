import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <main class="home">
      <section class="home-panel" aria-labelledby="page-title">
        <h1 id="page-title">{{ title() }}</h1>
        <p class="status" role="status">Funções em desenvolvimento</p>

        <nav class="actions" aria-label="Funcionalidades">
          <button type="button" data-action="contatos" disabled>
            Contatos
          </button>
          <button type="button" data-action="avisos" disabled>
            Avisos
          </button>
        </nav>
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

    .status {
      margin: 20px 0 28px;
      font-size: clamp(1.125rem, 4vw, 1.35rem);
      font-weight: 700;
      color: #5b3218;
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
      cursor: not-allowed;
      opacity: 1;
    }

    button[disabled] {
      background: #dce8e4;
      color: #31433e;
      border-color: #718680;
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

    @media (prefers-reduced-motion: reduce) {
      * {
        scroll-behavior: auto;
      }
    }
  `
})
export class App {
  protected readonly title = signal('Apoio do bairro');
}
