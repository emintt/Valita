import {promisePool} from '@/lib/db';
import {Post} from '@/types/DBTypes';
import {ResultSetHeader, RowDataPacket} from 'mysql2';

const fetchAllPost = async (): Promise<Post[] | null> => {
  // const uploadPath = process.env.UPLOAD_URL;
  try {
    const sql = `SELECT *
      FROM Posts`;
    const [rows] = await promisePool.execute<RowDataPacket[] & Post[]>(sql);

    if (rows.length === 0) {
      return null;
    }
    return rows;
  } catch (e) {
    console.error('fetchAllPost error', (e as Error).message);
    throw new Error((e as Error).message);
  }
};

const postPost = async (
  post: Omit<Post, 'post_id' | 'created_at'>,
): Promise<Post | null> => {
  const {user_id, filename, filesize, media_type, title, content, company_id} =
    post;
  const sql = `INSERT INTO Posts (user_id, filename, filesize, media_type, title, content, company_id)
               VALUES (?, ?, ?, ?, ?, ?, ?)`;
  const params = [
    user_id,
    filename,
    filesize,
    media_type,
    title,
    content,
    company_id,
  ];
  try {
    const result = await promisePool.execute<ResultSetHeader>(sql, params);
    const [rows] = await promisePool.execute<RowDataPacket[] & Post[]>(
      'SELECT * FROM Posts WHERE post_id = ?',
      [result[0].insertId],
    );
    if (rows.length === 0) {
      return null;
    }
    return rows[0];
  } catch (e) {
    console.error('error', (e as Error).message);
    throw new Error((e as Error).message);
  }
};

export {fetchAllPost, postPost};
