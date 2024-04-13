import {promisePool} from '@/lib/db';
import {Company, PostWithCompanyName} from '@/types/DBTypes';
import {CompanyResponse} from '@/types/MessageTypes';
import {RowDataPacket, ResultSetHeader} from 'mysql2';

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

const PostCompany = async (
  companyName: string,
): Promise<CompanyResponse | null> => {
  try {
    let companyId = 0;
    // check if company name exists
    const sql1 = `SELECT * from Companies WHERE company_name = "${companyName}"`;
    const [selectResult] = await promisePool.execute<
      RowDataPacket[] & Company[]
    >(sql1);
    // if it does not exist, create and take its company id
    if (selectResult.length === 0) {
      const sql2 = `INSERT INTO Companies (company_name) VALUES (?)`;
      const params2 = [companyName];

      const [insertResult] = await promisePool.execute<ResultSetHeader>(
        sql2,
        params2,
      );
      // console.log(insertResult);

      if (insertResult.affectedRows === 0) {
        return null;
      }

      companyId = insertResult.insertId;
    } else {
      // if it exists, take its company id
      companyId = selectResult[0].company_id;
    }
    return {
      message: selectResult.length === 0 ? 'Company created' : 'Company exists',
      company_id: companyId,
    };
  } catch (e) {
    console.error('post company error', (e as Error).message);
    throw new Error((e as Error).message);
  }
};

export {fetchCompanyById, PostCompany};
