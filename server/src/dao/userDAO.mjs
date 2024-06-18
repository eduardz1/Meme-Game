import db from "../db/db.mjs";
import {User} from "../components/user.mjs";

class UserDAO {
    static getUserByEmail(email) {
        return db.prepare("SELECT * FROM User WHERE email = ?").get(email).map((user) => {
            return new User(user.name, user.surname, user.email);
        });
    }
}

export default UserDAO;