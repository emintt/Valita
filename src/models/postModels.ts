import {promisePool} from '@/lib/db';
import {Post, PostWithCompanyName, UserLevel} from '@/types/DBTypes';
import { MessageResponse } from '@/types/MessageTypes';
import {ResultSetHeader, RowDataPacket} from 'mysql2';
import { getUserById } from './userModel';

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


const fetchPostWithCompanyNameById = async (id: string) => {
  try {
    const sql = `SELECT 
    Posts.post_id,
    Posts.user_id,
    Companies.company_id,
    Companies.company_name,
    Posts.filename,
    Posts.filesize,
    Posts.media_type,
    Posts.title,
    Posts.content,
    Posts.created_at
FROM 
    Posts
INNER JOIN 
    Companies ON Posts.company_id = Companies.company_id
WHERE 
    Posts.post_id = ?;
`;
    const params = [id];
    const [rows] = await promisePool.execute<RowDataPacket[] & PostWithCompanyName[]>(sql, params);
    // console.log('row', rows);
    if (rows.length === 0) {
      return null;
    }
    return rows[0];
  } catch (e) {
    console.error('fetchPost error', (e as Error).message);
    throw new Error((e as Error).message);
  }
}

const deletePost = async (
  post_id: number,
  user_id: number,
  level_name: string
): Promise<MessageResponse> => {
  
  const connection = await promisePool.getConnection();

  try {
    await connection.beginTransaction();

    await connection.execute('DELETE FROM Likes WHERE post_id = ?;', [
      post_id,
    ]);

    await connection.execute('DELETE FROM Comments WHERE post_id = ?;', [
      post_id,
    ]);

    let sql = '';
    if (level_name === 'Admin') {
      sql = connection.format('DELETE FROM Posts WHERE post_id = ?', [
        post_id,
      ]);
    } else {
      sql = connection.format(
        'DELETE FROM Posts WHERE post_id = ? AND user_id = ?',
        [post_id, user_id]
      );
    }
    console.log(sql);
    // note, user_id in SQL so that only the owner of the pot can delete it
    const [result] = await connection.execute<ResultSetHeader>(sql);

    if (result.affectedRows === 0) {
      return {message: 'Post not deleted'};
    }

    
    // if no errors commit transaction
    await connection.commit();

    return {
      message: 'Post deleted',
    };
  } catch (e) {
    await connection.rollback();
    console.error('error', (e as Error).message);
    throw new Error((e as Error).message);
    } finally {
    connection.release();
  }
};


export {fetchAllPost, postPost, fetchPostWithCompanyNameById, deletePost};
