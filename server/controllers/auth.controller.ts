import { Response, Request } from 'express'
import UserModel from '../models/user.model'
import { SignupSchemaType, LoginSchemaType } from '../schemas/user.schema'
import createJwt from '../libs/create-jwt'

export const register = async (req: Request<unknown, unknown, SignupSchemaType>, res: Response) => {
  try {
    const userFound = await UserModel.findOne({ email: req.body.email })
    
    if(userFound) {
      return res.status(400).json({ message: 'User already exists' })
    }

    const newUser = new UserModel({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    })

    await newUser.hashPassword()

    await newUser.save()
    
    res.status(201).json({ message: 'User created successfully' })

  } catch (error) {
    console.log(error, 'ERROR_CREATE_USER')
    res.status(500).json({ message: 'ERROR_CREATE_USER' })
  }
}

export async function login(req: Request<unknown, unknown, LoginSchemaType>, res: Response) {
  try {
    const userFound = await UserModel.findOne({ email: req.body.email })

  if(!userFound) {
    return res.status(400).json({ message: 'Invalid credentials' })
  }

  const validPassword = await userFound.comparePassword(req.body.password)

  if(!validPassword) {
    return res.status(400).json({ message: 'Invalid credentials' })
  }

  const token = createJwt(userFound._id.toString())

  return res.json({ token })
  } catch (error) {
    console.log(error, 'ERROR_LOGIN')
    res.status(500).json({ message: 'Internal server error' })
  }
}

export async function getProfile(req: Request, res: Response) {

  console.log(req.user.id)

  if(!req.user.id) {
    return res.status(404).json({ message: 'User not found' })
  }

  const user = await UserModel.findById(req.user.id).select('-password -__v')

  if(!user) {
    return res.status(404).json({ message: 'User not found' })
  }

  return res.json(user )
}
