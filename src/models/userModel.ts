import {User, UserWithLevel, UserWithNoPassword} from '@/types/DBTypes';
import {promisePool} from '@/lib/db';
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
    if (rows.length === 0) {
      return null;
    }
    return rows[0];
  } catch (e) {
    console.error('getUserByEmail error', (e as Error).message);
    throw new Error((e as Error).message);
  }
};

const getUserById = async (id: number): Promise<UserWithLevel | null> => {
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
    WHERE Users.user_id = ?
  `,
      [id],
    );
    const [rows] = await promisePool.execute<RowDataPacket[] & UserWithLevel[]>(
      sql,
    );
    if (rows.length === 0) {
      return null;
    }
    return rows[0];
  } catch (e) {
    console.error('getUserById error', (e as Error).message);
    throw new Error((e as Error).message);
  }
};

const createUser = async (
  user: Pick<User, 'email' | 'password'>,
): Promise<UserWithNoPassword | null> => {
  try {
    const result = await promisePool.execute<ResultSetHeader>(
      `
    INSERT INTO Users (email, password, user_level_id)
    VALUES (?, ?, ?)
  `,
      [user.email, user.password, 2],
    );
    // console.log(result[0]);
    if (result[0].affectedRows === 0) {
      return null;
    }

    const newUser = await getUserById(result[0].insertId);
    return newUser;
  } catch (e) {
    console.error('createUser error', (e as Error).message);
    throw new Error((e as Error).message);
  }
};

const checkEmailExists = async (email: string): Promise<{available: boolean}> => {
  try {
    // console.log('test email check', email);
    const user = await getUserByEmail(email);
    return {available: user ? false : true};
  } catch (e) {
    console.error('checkEmailExists error', (e as Error).message);
    throw new Error((e as Error).message);
  }
};

export {getUserByEmail, createUser, checkEmailExists};
