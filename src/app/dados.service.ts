import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, delay, map, of, throwError } from 'rxjs';
import { AvisoTeste, AVISOS_TESTE } from './avisos.teste';
import { ContatoTeste, CONTATOS_TESTE } from './contatos.teste';
import { environment } from '../environments/environment';

export interface DadosAvisos {
  avisos: readonly AvisoTeste[];
  origem: 'demonstracao' | 'supabase';
}

@Injectable({ providedIn: 'root' })
export class DadosService {
  private readonly http = inject(HttpClient);

  readonly configurado = Boolean(environment.supabaseUrl && environment.supabasePublicKey);

  contatos(): Observable<readonly ContatoTeste[]> {
    if (!this.configurado) {
      return of(CONTATOS_TESTE);
    }

    return this.http.get<ContatoSupabase[]>(
      `${this.baseUrl()}/rest/v1/contatos?select=nome,telefone,fonte&oficial=eq.true&ativo=eq.true&order=nome.asc`,
      { headers: this.headers() },
    ).pipe(map((itens) => itens.map((item) => ({
      nome: item.nome,
      telefone: item.telefone,
      fonte: item.fonte,
    }))));
  }

  avisos(): Observable<DadosAvisos> {
    if (!this.configurado) {
      return of({
        avisos: AVISOS_TESTE.filter((aviso) => aviso.verificado),
        origem: 'demonstracao' as const,
      }).pipe(delay(250));
    }

    return this.http.get<AvisoSupabase[]>(
      `${this.baseUrl()}/rest/v1/avisos?select=id,titulo,texto,data_publicacao,fonte,verificado&verificado=eq.true&ativo=eq.true&order=data_publicacao.desc`,
      { headers: this.headers() },
    ).pipe(map((itens) => ({
      origem: 'supabase' as const,
      avisos: itens.map((item) => ({
        titulo: item.titulo,
        texto: item.texto,
        data: item.data_publicacao,
        fonte: item.fonte,
        verificado: item.verificado === true,
      })).filter((aviso) => aviso.verificado),
    })), catchError((erro: HttpErrorResponse) => throwError(() => erro)));
  }

  private baseUrl(): string {
    return environment.supabaseUrl.replace(/\/$/, '');
  }

  private headers(): HttpHeaders {
    return new HttpHeaders({
      apikey: environment.supabasePublicKey,
      Authorization: `Bearer ${environment.supabasePublicKey}`,
      Accept: 'application/json',
    });
  }
}

interface ContatoSupabase {
  nome: string;
  telefone: string;
  fonte: string;
}

interface AvisoSupabase {
  id: string;
  titulo: string;
  texto: string;
  data_publicacao: string;
  fonte: string;
  verificado: boolean;
}
