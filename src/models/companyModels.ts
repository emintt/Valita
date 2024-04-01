import {promisePool} from '@/lib/db';
import {Company, PostWithCompanyName} from '@/types/DBTypes';
import {RowDataPacket} from 'mysql2';

// fetch company name by company id
const fetchCompanyById = async (
  id: number,
): Promise<Pick<Company, 'company_name'> | null> => {
  try {
    const sql = `SELECT company_name FROM Companies 
      WHERE company_id = ${id}`;
    const [rows] = await promisePool.execute<
      RowDataPacket[][] & Pick<Company, 'company_name'>[]
    >(sql);
    if (rows.length === 0) {
      return null;
    }
    // console.log('rows 0', rows[0]);
    return rows[0];
  } catch (e) {
    console.error('fetch company error', (e as Error).message);
    throw new Error((e as Error).message);
  }
};

export {fetchCompanyById};
