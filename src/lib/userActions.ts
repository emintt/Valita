// import { getUserById } from "@/models/userModel";

// export async function fetchUserByIdAction (id: number) {
//   try { 
//     // console.log('id from server action', id);
//     if (!id) {
//       return {
//         type: 'error',
//         message: 'Invalid user id parameter',
//       }
//     }

//     // Get user from DB
//     const user = await getUserById(id);

    
//     if (!user) {
//       return {
//         type: 'error',
//         message: 'Error fetching user',
//       };
//     }

//     return user;
//   } catch (e) {
//     console.error(e);
//   }


// };