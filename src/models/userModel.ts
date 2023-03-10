import bcrypt from "bcrypt"
import Client from "../database"

const { BCRYPT_PASSWORD, SALT_ROUNDS } = process.env

export interface UserData {
    first_name: string;
    last_name: string;
}

export interface AuthUser extends UserData {
    user_name: string;
    password: string;
}

export interface User extends AuthUser {
    id: number;
}

export class UserStore {
    async index(): Promise<User[]> {
        try {
            const connection = await Client.connect()
            const sql = "SELECT * FROM users"
            const { rows } = await connection.query(sql)
            connection.release()
            return rows
        } catch (err) {
            throw new Error(`Could not get users. ${err}`)
        }
    }

    async create(user: AuthUser): Promise<User> {
        const { first_name: first_name, last_name: last_name, user_name: user_name, password } = user

        try {
            const sql = `INSERT INTO users (first_name, last_name, user_name, password_digest) VALUES($1, $2, $3, $4) RETURNING *`
            const hash = bcrypt.hashSync(password + BCRYPT_PASSWORD, parseInt(SALT_ROUNDS as string, 10))
            const connection = await Client.connect()
            const { rows } = await connection.query(sql, [first_name, last_name, user_name, hash])

            connection.release()

            return rows[0]
        } catch (err) {
            throw new Error(`Could not add new user ${first_name} ${last_name}. ${err}`)
        }
    }

    async read(id: number): Promise<User> {
        try {
            const sql = "SELECT * FROM users WHERE id=($1)"
            const connection = await Client.connect()
            const { rows } = await connection.query(sql, [id])

            connection.release()

            return rows[0]
        } catch (err) {
            throw new Error(`Could not find user ${id}. ${err}`)
        }
    }

    async update(id: number, newUserData: UserData): Promise<User> {
        const { first_name: first_name, last_name: last_name } = newUserData

        try {
            const sql = "UPDATE users SET first_name = $1, last_name = $2 WHERE id = $3 RETURNING *"
            const connection = await Client.connect()
            const { rows } = await connection.query(sql, [first_name, last_name, id])

            connection.release()

            return rows[0]
        } catch (err) {
            throw new Error(`Could not update user ${first_name} ${last_name}. ${err}`)
        }
    }

    async deleteUser(id: number): Promise<boolean> {
        try {
            const sql = "DELETE FROM users WHERE id=($1)"
            const connection = await Client.connect()

            await connection.query(sql, [id])

            connection.release()

            return true
        } catch (err) {
            throw new Error(`Could not delete user ${id}. ${err}`)
        }
    }

    async authenticate(user_name: string, password: string): Promise<User | null> {
        try {
            const sql = "SELECT * FROM users WHERE user_name=($1)"
            const connection = await Client.connect()
            const { rows } = await connection.query(sql, [user_name])

            if (rows.length > 0) {
                const user = rows[0]

                if (bcrypt.compareSync(password + BCRYPT_PASSWORD, user.password_digest)) {
                    return user
                }
            }

            connection.release()

            return null
        } catch (err) {
            throw new Error(`Could not find user ${user_name}. ${err}`)
        }
    }
}