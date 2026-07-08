import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, NgForm } from '@angular/forms';

import { Blog } from './blog';

describe('Blog', () => {
  let component: Blog;
  let fixture: ComponentFixture<Blog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Blog],
      imports: [FormsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Blog);
    component = fixture.componentInstance;
    fixture.detectChanges();
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
    expect(formularioMock.resetForm).toHaveBeenCalled();
  });
});