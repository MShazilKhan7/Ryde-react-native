import { neon } from "@neondatabase/serverless";

const DATABASE_URL = `postgresql://neondb_owner:D4EOZqkmjon5@ep-patient-silence-a51wdkvp.us-east-2.aws.neon.tech/neondb?sslmode=require`;

// /**
//  * Executes an SQL query on the database.
//  * @param {TemplateStringsArray} query - The SQL query template.
//  * @param {...any} params - Parameters for the SQL query.
//  * @returns {Promise<any>} - The query results.
//  */

export const executeQuery = async (query: string, ...params: any) => {
  try {
    const sql = neon(DATABASE_URL);
    console.log("QUERY:",query) 
    const result = await sql(query, ...params);
    console.log("Query executed successfully:", result);
    return result;
  } catch (error) {
    console.error("Database query error:", error);
    throw error; // Propagate error to the calling function
  }
};

export const getDrivers = async () => {
  const query = `SELECT * FROM drivers`;
  return executeQuery(query);
};

export const createUser = async (data: {
  name: string;
  email: string;
  clerkId: string;
}) => {
  const { name, email, clerkId } = data;
  console.log(name, email, clerkId);
  const query = `
      INSERT INTO users (
        name, 
        email, 
        clerk_id
      ) 
      VALUES (
        ${name}, 
        ${email},
        ${clerkId}
     );
    `;
  return executeQuery(query);
};
