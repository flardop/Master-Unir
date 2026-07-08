import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, NgForm } from '@angular/forms';

import { Blog } from './blog';

const STORAGE_KEY = 'blog-noticias';

describe('Blog', () => {
  let component: Blog;
  let fixture: ComponentFixture<Blog>;

  beforeEach(async () => {
    localStorage.clear();

    await TestBed.configureTestingModule({
      declarations: [Blog],
      imports: [FormsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Blog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should start with two initial news items', () => {
    expect(component.noticias.length).toBe(2);
  });

  it('should show an error when a field is empty', () => {
    const formularioMock = {
      resetForm: jasmine.createSpy('resetForm'),
    } as unknown as NgForm;

    component.nuevaNoticia = {
      titulo: 'Nueva noticia',
      imagen: '',
      texto: 'Contenido de prueba',
      fecha: '2026-07-07',
    };

    component.agregarNoticia(formularioMock);

    expect(component.mensajeError).toContain('Todos los campos son obligatorios');
    expect(component.noticias.length).toBe(2);
    expect(formularioMock.resetForm).not.toHaveBeenCalled();
  });

  it('should add a new item to the list when the form is valid', () => {
    const formularioMock = {
      resetForm: jasmine.createSpy('resetForm'),
    } as unknown as NgForm;

    component.nuevaNoticia = {
      titulo: 'Nueva noticia',
      imagen: 'https://example.com/noticia.jpg',
      texto: 'Contenido de prueba',
      fecha: '2026-07-07',
    };

    component.agregarNoticia(formularioMock);

    expect(component.mensajeError).toBe('');
    expect(component.noticias.length).toBe(3);
    expect(component.noticias[0].titulo).toBe('Nueva noticia');
    expect(JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]')[0].titulo).toBe('Nueva noticia');
    expect(formularioMock.resetForm).toHaveBeenCalled();
  });

  it('should load saved news from local storage on init', () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([
      {
        titulo: 'Noticia guardada',
        imagen: 'https://example.com/guardada.jpg',
        texto: 'Contenido recuperado',
        fecha: '2026-07-08',
      },
    ]));

    const nuevoFixture = TestBed.createComponent(Blog);
    const nuevoComponente = nuevoFixture.componentInstance;
    nuevoFixture.detectChanges();

    expect(nuevoComponente.noticias.length).toBe(1);
    expect(nuevoComponente.noticias[0].titulo).toBe('Noticia guardada');
  });
});
