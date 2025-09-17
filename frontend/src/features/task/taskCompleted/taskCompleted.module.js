import { atom } from "nanostores";
import { createNotification } from "../../notifications/notificiation.js";
import { BACK_ENDPOINT } from "../../../config/endpoints.js";
import ky from "ky";
const BASE_URL = `${BACK_ENDPOINT}/api/taskCompleted`;


/** @type {taskCompleted[]} */
let taskCompletedArray = [];
export const task = atom(taskCompletedArray);

/** 
  * Agrega un usuario.
  * @param {object} taskCompleted completar
*/

const completeTask = async (taskCompleted) => {
     try {
      await ky.post(BASE_URL, {json:taskCompleted,credentials: 'include'});
      // Reinciar todos los estados del formulario
      
      createNotification({ 
        title: 'Actividad completada!', 
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
  completeTask
}