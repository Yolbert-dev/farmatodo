import { atom } from "nanostores";
import { createNotification } from "../notifications/notificiation.js";
import { BACK_ENDPOINT } from "../../config/endpoints.js";
import ky from "ky";
const BASE_URL = `${BACK_ENDPOINT}/api/task`;

/** 
  * @typedef Contact
  * @type {object}
  * @property {string} id El id del contacto
  * @property {string} name El nombre del contacto
  * @property {string} phone El numero del contacto
*/

/** @type {task[]} */
let taskArray = [];
export const task = atom(taskArray);

/** 
  * Agrega un usuario.
  * @param {object} taskToCreate la tarea nueva
*/

const addtask = async (taskToCreate) => {
     try {
      await ky.post(BASE_URL, {json:taskToCreate});
      // Reinciar todos los estados del formulario
      
      createNotification({ 
        title: 'Actividad creada!', 
        type: 'success'
      });
      
    // cerrar el modal después de guardar
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

  
export default {
  addtask
}