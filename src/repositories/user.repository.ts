import UserModel from "../model/user.model";
import db from "../db";
import DatabaseError from "../errors/database.error";

class UserRepository{
    async findAllUsers():Promise<UserModel[]>{
        const query = `SELECT uuid, username FROM application_user`;

        const {rows} = await db.query<UserModel>(query);
        return rows || [];
    }

    async findById(uuid:string):Promise<UserModel>{
        try{
            const query = `
            SELECT uuid, username 
            FROM application_user 
            WHERE uuid = $1`;

            const values = [uuid];
            const {rows} = await db.query<UserModel>(query, values);
            const [user] = rows;
            return user;
        } catch (error){
            throw new DatabaseError('Erro na consulta por ID', error);
        }
    }

    async create(user: UserModel): Promise<string>{
        const script = `
            INSERT INTO application_user (username,password)
            VALUES ($1, crypt($2,'my_salt'))
            RETURNING uuid
        `;
        const values = [user.username, user.password];

        const { rows } = await db.query<{ uuid: string}>(script, values);
        const [newUser] = rows;

        return newUser.uuid;
    }

    async update(user: UserModel): Promise<void>{
        const script = `
            UPDATE application_user
            SET
                username = $1,
                password = crypt($2, 'my_salt')
            WHERE uuid = $3
        `;
        const values = [user.username, user.password, user.uuid];
        await db.query<{ uuid: string}>(script, values);
    }

    async remove(uuid:string): Promise<void>{
        const script = `
            DELETE
            FROM application_user
            WHERE uuid = $1
        `;
        const values = [uuid];
        await db.query<{ uuid: string}>(script, values);
    }

    async findByUsernameAndPassword(username: string, password: string):Promise<UserModel | null> {
        try{
            const query = `
            SELECT uuid, username
            FROM application_user
            WHERE usename = $1
            AND password = crypt($2, 'my_salt')`;

            const values = [username, username]
            const { rows } = await db.query<UserModel>(query, values)
            const [user] = rows
            return user || null;
        }catch (error){
            throw new DatabaseError('Error na consulta por username e password', error)
        }
    }
}
export default new UserRepository();