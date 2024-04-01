import {promisePool} from '@/lib/db';
import {Post} from '@/types/DBTypes';
import {RowDataPacket} from 'mysql2';

const fetchAllPost = async (): Promise<Post[] | null> => {
  // const uploadPath = process.env.UPLOAD_URL;
  try {
    // const sql = `SELECT *
    //   FROM Posts`;
    // const [rows] = await promisePool.execute<RowDataPacket[] & Post[]>(sql);

    // if (rows.length === 0) {
    //   return null;
    // }
    // console.log(rows);
    // return rows;
    return [
      {
        post_id: 1,
        user_id: 1,
        company_id: 1,
        filename: 'sunset.jpg',
        filesize: 1024,
        media_type: 'image/jpeg',
        title: 'Testi title',
        content: 'Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
        created_at: '2024-03-25T13:39:18.000Z'
      },
      {
        post_id: 2,
        user_id: 2,
        company_id: 2,
        filename: 'sunset.jpg',
        filesize: 1024,
        media_type: 'image/jpeg',
        title: 'Testi title',
        content: 'It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.',
        created_at: '2024-03-25T13:39:18.000Z'
      },
      {
        post_id: 3,
        user_id: 3,
        company_id: 3,
        filename: 'sunset.jpg',
        filesize: 1024,
        media_type: 'image/jpeg',
        title: 'Jotain title',
        content: ' It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum',
        created_at: '2024-03-25T13:39:18.000Z'
      }
    ];
    
  } catch (e) {
    console.error('fetchAllPost error', (e as Error).message);
    throw new Error((e as Error).message);
  }
};

export {fetchAllPost};
