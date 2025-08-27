import { atom } from "nanostores";
import { createNotification } from "../notifications/notificiation.js";
import { BACK_ENDPOINT } from "../../config/endpoints.js";
import ky from "ky";
const BASE_URL = `${BACK_ENDPOINT}/api/users`;

/** 
  * @typedef Contact
  * @type {object}
  * @property {string} id El id del contacto
  * @property {string} name El nombre del contacto
  * @property {string} phone El numero del contacto
*/

/** @type {users[]} */
let userArray = [];
export const users = atom(userArray);

/** 
  * Agrega un usuario.
  * @param {object} UserToCreate El nuevo usuario
*/

const addUser = async (UserToCreate) => {
     try {
      await ky.post(BASE_URL, {json:UserToCreate});
      // Reinciar todos los estados del formulario
      
      createNotification({ 
        title: 'Usuario creado!', 
        type: 'success'
      });
      
    // cerrar el modal después de guardar
        document.getElementById('modal').classList.add('hidden');
        location.reload();

    } catch (error) {
      const errorData = await error?.response?.json();
      console.log(error);
      
      createNotification({ 
        title: 'Ups! Hubo un error', 
        description: errorData?.error ?? 'Sin mensaje', 
        type: 'error'
      });
    } 
  }
  /**
  * Elimina un contacto
  * @param {string} id El id del contacto a eliminar
*/
const removeUser = async (id) => {
  const url = `${BASE_URL}/${id}`;
  try {
    const contactDeleted = await ky.delete(url).json();
    createNotification({
      title: 'Usuario eliminado',
      description: `${contactDeleted.name}`,
      type: 'success'
    });
  } catch (error) {
    console.log(error);
    const errorData = await error.response.json();
    createNotification({
      title: 'Ups! Hubo un error',
      description: errorData.error,
      type: 'error'
    });
  }
}



export default {
  addUser,
  removeUser

}