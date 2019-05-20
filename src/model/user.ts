import mongoose, {Document} from 'mongoose';
import { hashSync, genSaltSync, compareSync } from 'bcrypt-nodejs';

const userSchema = new mongoose.Schema({
  local: {
    name: String,
    email: String,
    password: String,
  }
});

export function generateHash(password: string): string {
  return hashSync(password, genSaltSync(8));
}

export function validPassword(password: string, user: Document): boolean {
  return compareSync(password, user.get('local.password'));
}

export default mongoose.model('User', userSchema);




