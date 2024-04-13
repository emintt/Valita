import { UserWithLevel } from '@/types/DBTypes';
import { promisePool } from '@/lib/db';
import {ResultSetHeader, RowDataPacket} from 'mysql2';




const getUserByEmail = async (email: string): Promise<UserWithLevel | null> => {
  try {
    const sql = promisePool.format(
      `
      SELECT
      Users.user_id,
      Users.password,
      Users.email,
      Users.created_at,
      UserLevels.level_name
    FROM Users
    JOIN UserLevels
    ON Users.user_level_id = UserLevels.level_id
    WHERE Users.email = ?
  `,
      [email],
    );
    const [rows] = await promisePool.execute<RowDataPacket[] & UserWithLevel[]>(
      sql,
    );
    console.log(rows);
    if (rows.length === 0) {
      return null;
    }
    return rows[0];
  } catch (e) {
    console.error('getUserByEmail error', (e as Error).message);
    throw new Error((e as Error).message);
  }
};

export {
  getUserByEmail,

};