import { beforeEach, describe, expect, it, vi } from 'vitest';
import request from 'supertest';
import app from '../../../app.js';
import { ErrorWithStatus } from '../../utils/errorTypes.js';

const mocks = vi.hoisted(() => {
  return {
    contactsRepository: {
      getAll: vi.fn(),
      addOne: vi.fn(),
      deleteOneById: vi.fn(),
      updateOneById: vi.fn(),
    },
  };
});

vi.mock('./contacts.repository.js', () => ({ default: mocks.contactsRepository }));

const contacts = [{ id: 123, name: 'Gabriel Garcia', phone: '04122110606' }];

describe('Cuando se intenta obtener los contactos', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('debe devolver los contactos cuando todo esta correcto', async () => {
    mocks.contactsRepository.getAll.mockResolvedValue(contacts);
    const response = await request(app).get('/contacts');
    expect(mocks.contactsRepository.getAll).toHaveBeenCalledTimes(1);
    expect(response.statusCode).toBe(200);
    expect(response.body).length(1);
  });
});

describe('Cuando se intenta agregar un contacto', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('debe devolver el contacto agregado cuando la validacio es correcta', async () => {
    const newContactStructure = { name: 'Alejandro Perez', phone: '04122334566' };
    const expectedContactStructure = { ...newContactStructure, id: 678 };
    mocks.contactsRepository.addOne.mockResolvedValue(expectedContactStructure);
    const response = await request(app).post('/contacts').send(newContactStructure);
    expect(mocks.contactsRepository.addOne).toHaveBeenCalledTimes(1);
    expect(mocks.contactsRepository.addOne).toBeCalledWith(newContactStructure);
    expect(response.statusCode).toBe(200);
    expect(response.body).toStrictEqual(expectedContactStructure);
  });
  it('debe devolver un error describiendo las causas de porque la validacion fallo', async () => {
    const newContactStructure = { name: 'Alejandro', phone: '04122334566' };
    const response = await request(app).post('/contacts').send(newContactStructure);
    expect(response.statusCode).toBe(400);
    expect(response.body).toStrictEqual({ error: 'El nombre no es valido.' });
  });
});

describe('Cuando se intenta eliminar un contacto', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('debe devolver el contacto eliminado cuando todo es correcto', async () => {
    const expectedContactStructure = contacts[0];
    mocks.contactsRepository.deleteOneById.mockResolvedValue(expectedContactStructure);
    const response = await request(app).delete('/contacts/123');
    expect(mocks.contactsRepository.deleteOneById).toHaveBeenCalledTimes(1);
    expect(mocks.contactsRepository.deleteOneById).toBeCalledWith(contacts[0].id);
    expect(response.statusCode).toBe(200);
    expect(response.body).toStrictEqual(expectedContactStructure);
  });
  it('debe devolver un error cuando el id no es un numero', async () => {
    const response = await request(app).delete('/contacts/ifhsifj');
    expect(response.statusCode).toBe(400);
    expect(response.body).toStrictEqual({ error: 'El id tiene que ser un numero' });
  });
  it('debe devolver un error el contacto no fue encontrado', async () => {
    mocks.contactsRepository.deleteOneById.mockRejectedValue(
      new ErrorWithStatus(404, 'El contacto fue no encontrado'),
    );
    const response = await request(app).delete('/contacts/6464');
    expect(response.statusCode).toBe(404);
    expect(response.body).toStrictEqual({ error: 'El contacto fue no encontrado' });
  });
});

describe('Cuando se intenta actualizar un contacto', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('debe devolver el contacto actualizado cuando todo es correcto', async () => {
    const newContactStructure = { name: 'Alejandro Perez', phone: '04122334566' };
    const expectedContactStructure = { ...contacts[0], ...newContactStructure };
    mocks.contactsRepository.updateOneById.mockResolvedValue(expectedContactStructure);
    const response = await request(app).put('/contacts/123').send(newContactStructure);
    expect(mocks.contactsRepository.updateOneById).toHaveBeenCalledTimes(1);
    expect(mocks.contactsRepository.updateOneById).toBeCalledWith(
      contacts[0].id,
      newContactStructure,
    );
    expect(response.statusCode).toBe(200);
    expect(response.body).toStrictEqual(expectedContactStructure);
  });
  it('debe devolver un error cuando el id no es un numero', async () => {
    const newContactStructure = { name: 'Alejandro Perez', phone: '04122334566' };
    const response = await request(app).put('/contacts/ifhsifj').send(newContactStructure);
    expect(response.statusCode).toBe(400);
    expect(response.body).toStrictEqual({ error: 'El id tiene que ser un numero' });
  });
  it('debe devolver un error el contacto no fue encontrado', async () => {
    const newContactStructure = { name: 'Alejandro Perez', phone: '04122334566' };
    mocks.contactsRepository.updateOneById.mockRejectedValue(
      new ErrorWithStatus(404, 'El contacto fue no encontrado'),
    );
    const response = await request(app).put('/contacts/6464').send(newContactStructure);
    expect(response.statusCode).toBe(404);
    expect(response.body).toStrictEqual({ error: 'El contacto fue no encontrado' });
  });
  it('debe devolver un error describiendo las causas de porque la validacion fallo', async () => {
    const newContactStructure = { name: 'Alejandro', phone: '04122334566' };
    const response = await request(app).put('/contacts/123').send(newContactStructure);
    expect(response.statusCode).toBe(400);
    expect(response.body).toStrictEqual({ error: 'El nombre no es valido.' });
  });
});
