import { prop, getModelForClass, modelOptions } from '@typegoose/typegoose'
import bcrypt from 'bcrypt'

modelOptions({
  schemaOptions: {
    timestamps: true
  }
})

export class User {

  @prop({ required: true, trim: true })
  name!: string;

  @prop({ required: true, unique: true, trim: true })
  email!: string;

  @prop({ required: true, trim: true, min: 6 })
  password!: string;

  public async comparePassword(password: string) {
    return await bcrypt.compare(password, this.password);
  }

  public async hashPassword() {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
}

const UserModel = getModelForClass(User)

export default UserModel