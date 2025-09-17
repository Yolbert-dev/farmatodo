import { atom } from "nanostores";
import { createNotification } from "../notifications/notificiation.js";
import { BACK_ENDPOINT } from "../../config/endpoints.js";
import ky from "ky";
const BASE_URL = `${BACK_ENDPOINT}/api/incidence`;

/** 
  * @typedef Contact
  * @type {object}
  * @property {string} id El id del contacto
  * @property {string} name El nombre del contacto
  * @property {string} phone El numero del contacto
*/

/** @type {incidence[]} */
let incidenceArray = [];
export const incidence = atom(incidenceArray);

/** 
  * Agrega un usuario.
  * @param {object} incidence El nuevo usuario
*/

const addUser = async (incidence) => {
     try {
      await ky.post(BASE_URL, {json:incidence,credentials: 'include'});
      // Reinciar todos los estados del formulario
      
      createNotification({ 
        title: 'incidencia creada!', 
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
    const incidenceDeleted = await ky.delete(url,{credentials: 'include'}).json();
    createNotification({
      title: 'incidencia eliminada',
      description: `${incidenceDeleted.type}`,
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