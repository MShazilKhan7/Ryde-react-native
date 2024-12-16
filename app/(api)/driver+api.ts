// "use server";
import { neon } from "@neondatabase/serverless";
console.log("hello world driver");
export async function GET(request: Request) {
  try {
    const sql = neon(
      `postgresql://neondb_owner:D4EOZqkmjon5@ep-patient-silence-a51wdkvp.us-east-2.aws.neon.tech/neondb?sslmode=require`
    );
    console.log("sql", sql);
    const response = await sql(`
    SELECT * FROM drivers`);
    console.log("response", response);
    return Response.json({
      data: response,
    });
  } catch (error) {
    console.log("Error", Response.json({ error: error }));
  }
}
