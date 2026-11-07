import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
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
    expect(compiled.textContent).toContain('Funções em desenvolvimento');
  });

  it('should open contacts and return to the home screen', async () => {
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

    const backButton = [...compiled.querySelectorAll('button')]
      .find((button) => button.textContent?.includes('Voltar ao início')) as HTMLButtonElement;
    backButton.click();
    await fixture.whenStable();

    expect(compiled.querySelector('[data-action="contatos"]')).toBeTruthy();
    expect(compiled.textContent).toContain('Funções em desenvolvimento');
  });
});
