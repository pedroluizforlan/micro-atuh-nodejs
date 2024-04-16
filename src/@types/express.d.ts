import {UserModel} from '../model/user.model.ts'

declare module 'express-serve-static-core' {
    interface Request {
        user?: UserModel
    }
}