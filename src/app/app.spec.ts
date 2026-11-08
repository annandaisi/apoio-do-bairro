import { provideHttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { App } from './app';
import { DadosService } from './dados.service';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideHttpClient(), DadosService],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render the neighborhood support screen', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('h1')?.textContent).toContain('Apoio do bairro');
    expect(compiled.querySelector('[data-action="contatos"]')?.textContent).toContain('Contatos');
    expect(compiled.querySelector('[data-action="avisos"]')?.textContent).toContain('Avisos');
  });

  it('should open contacts and their details', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;

    const contactsButton = compiled.querySelector('[data-action="contatos"]') as HTMLButtonElement;
    contactsButton.click();
    await fixture.whenStable();

    expect(compiled.textContent).toContain('Central Sol');
    expect(compiled.textContent).toContain('Apoio da Praça Sol');
    expect(compiled.textContent).toContain('(00) 0000-0001');
    expect(compiled.textContent).toContain('(00) 0000-0002');
    expect(compiled.textContent).toContain('Fonte de demonstração');
    expect(compiled.textContent).toContain('Dados fictícios — não faça ligações');

    const openCentralSol = compiled.querySelector('[data-open-contact="Central Sol"]') as HTMLButtonElement;
    openCentralSol.click();
    await fixture.whenStable();

    expect(compiled.textContent).toContain('Contato selecionado');
    expect(compiled.textContent).toContain('Central Sol');
    expect(compiled.textContent).toContain('(00) 0000-0001');
    expect(compiled.textContent).toContain('Fonte de demonstração');
    expect(compiled.textContent).toContain('Dados fictícios — não faça ligações');

    const backToList = [...compiled.querySelectorAll('button')]
      .find((button) => button.textContent?.includes('Voltar à lista')) as HTMLButtonElement;
    backToList.click();
    await fixture.whenStable();

    const openPracaSol = compiled.querySelector('[data-open-contact="Apoio da Praça Sol"]') as HTMLButtonElement;
    openPracaSol.click();
    await fixture.whenStable();

    expect(compiled.textContent).toContain('Contato selecionado');
    expect(compiled.textContent).toContain('Apoio da Praça Sol');
    expect(compiled.textContent).toContain('(00) 0000-0002');
    expect(compiled.textContent).toContain('Fonte de demonstração');

    const backToHome = [...compiled.querySelectorAll('button')]
      .find((button) => button.textContent?.includes('Voltar à lista')) as HTMLButtonElement;
    backToHome.click();
    await fixture.whenStable();

    const backButton = [...compiled.querySelectorAll('button')]
      .find((button) => button.textContent?.includes('Voltar ao início')) as HTMLButtonElement;
    backButton.click();
    await fixture.whenStable();

    expect(compiled.querySelector('[data-action="contatos"]')).toBeTruthy();
    expect(compiled.querySelector('[data-action="avisos"]')).toBeTruthy();
  });

  it('should show verified warnings and open their details', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;

    const avisosButton = compiled.querySelector('[data-action="avisos"]') as HTMLButtonElement;
    avisosButton.click();
    fixture.detectChanges();
    expect(compiled.textContent).toContain('Carregando avisos verificados');

    await new Promise((resolve) => setTimeout(resolve, 300));
    await fixture.whenStable();
    fixture.detectChanges();

    expect(compiled.textContent).toContain('Mutirão de limpeza da praça');
    expect(compiled.textContent).toContain('Dados fictícios — não conectado ao Supabase');

    const openNotice = compiled.querySelector('[data-open-aviso="Mutirão de limpeza da praça"]') as HTMLButtonElement;
    openNotice.click();
    await fixture.whenStable();
    fixture.detectChanges();

    expect(compiled.textContent).toContain('Aviso verificado');
    expect(compiled.textContent).toContain('Mutirão de limpeza da praça');
    expect(compiled.textContent).toContain('07/11/2026');
    expect(compiled.textContent).toContain('Fonte de demonstração');

    const backToList = [...compiled.querySelectorAll('button')]
      .find((button) => button.textContent?.includes('Voltar à lista')) as HTMLButtonElement;
    backToList.click();
    await fixture.whenStable();
    fixture.detectChanges();
    expect(compiled.textContent).toContain('Mutirão de limpeza da praça');
  });

  it('should not render an unverified notice', async () => {
    TestBed.overrideProvider(DadosService, {
      useValue: {
        avisos: () => of({
          origem: 'demonstracao',
          avisos: [
            {
              titulo: 'Aviso verificado de teste',
              texto: 'Texto público verificado.',
              data: '2026-11-07',
              fonte: 'Fonte fictícia verificada',
              verificado: true,
            },
            {
              titulo: 'Aviso não verificado de teste',
              texto: 'Este texto não pode aparecer ao público.',
              data: '2026-11-07',
              fonte: 'Fonte fictícia não verificada',
              verificado: false,
            },
          ],
        }),
      },
    });
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;

    const avisosButton = compiled.querySelector('[data-action="avisos"]') as HTMLButtonElement;
    avisosButton.click();
    await fixture.whenStable();
    fixture.detectChanges();

    expect(compiled.textContent).toContain('Aviso verificado de teste');
    expect(compiled.textContent).not.toContain('Aviso não verificado de teste');
  });

  it('should show an empty verified notices state', async () => {
    TestBed.overrideProvider(DadosService, {
      useValue: {
        avisos: () => of({ avisos: [], origem: 'demonstracao' }),
      },
    });
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;

    const avisosButton = compiled.querySelector('[data-action="avisos"]') as HTMLButtonElement;
    avisosButton.click();
    await fixture.whenStable();
    fixture.detectChanges();

    expect(compiled.textContent).toContain('Nenhum aviso verificado disponível');
  });

  it('should show an error state for notices', async () => {
    TestBed.overrideProvider(DadosService, {
      useValue: {
        avisos: () => throwError(() => new Error('Falha de rede')),
      },
    });
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;

    const avisosButton = compiled.querySelector('[data-action="avisos"]') as HTMLButtonElement;
    avisosButton.click();
    await fixture.whenStable();
    fixture.detectChanges();

    expect(compiled.textContent).toContain('Não foi possível carregar os avisos');
    expect(compiled.textContent).toContain('Erro simples ao acessar os dados');
    expect(compiled.textContent).toContain('Tentar novamente');
  });
});
