import {promisePool} from '@/lib/db';
import {Post} from '@/types/DBTypes';
import {RowDataPacket} from 'mysql2';

const fetchAllPost = async (): Promise<Post[] | null> => {
  // const uploadPath = process.env.UPLOAD_URL;
  try {
    const sql = `SELECT *
      FROM Posts`;
    const [rows] = await promisePool.execute<RowDataPacket[] & Post[]>(sql);

    if (rows.length === 0) {
      return null;
    }
    console.log(rows);
    return rows;
  } catch (e) {
    console.error('fetchAllPost error', (e as Error).message);
    throw new Error((e as Error).message);
  }
};

export {fetchAllPost};
