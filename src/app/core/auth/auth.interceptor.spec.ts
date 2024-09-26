import { HttpEvent, HttpRequest } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { BASE_URL } from '../../config/url.config';
import { AuthInterceptor } from './auth.interceptor';

describe('AuthInterceptor', () => {
  let interceptor: AuthInterceptor;
  let httpHandler: { handle: jest.Mock<Observable<HttpEvent<any>>> };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthInterceptor]
    });

    interceptor = TestBed.inject(AuthInterceptor);
    httpHandler = {
      handle: jest.fn().mockImplementation((req: HttpRequest<any>) => {
        return of({} as HttpEvent<any>);
      })
    };
  });

  it('deve adicionar o cabeçalho X-Test-Key para requisições que incluem a BASE_URL', () => {
    const request = new HttpRequest('GET', `${BASE_URL.ANDBANK}/endpoint`);

    interceptor.intercept(request, httpHandler).subscribe();

    const clonedRequest = httpHandler.handle.mock.calls[0][0];
    expect(clonedRequest.headers.get('X-Test-Key')).toBe('g63yQdq4hDT9Qz65Q8h9b');
  });

  it('não deve adicionar o cabeçalho X-Test-Key para requisições que não incluem a BASE_URL', () => {
    const request = new HttpRequest('GET', 'https://someotherurl.com/endpoint');

    interceptor.intercept(request, httpHandler).subscribe();

    const clonedRequest = httpHandler.handle.mock.calls[0][0]; // Pega a última chamada de handle
    expect(clonedRequest.headers.has('X-Test-Key')).toBeFalsy(); // Verifica que o cabeçalho não foi adicionado
  });
});
