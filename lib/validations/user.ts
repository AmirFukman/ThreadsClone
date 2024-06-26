//this page define the validation for the user properties to sign up
import * as z from 'zod';

export const UserValidation = z.object({
    profile_photo: z.string().url().nonempty(),
    name: z.string().min(3, { message: 'MINIMUM 3 CHARACTERS' }).max(30,  'MAXIMUM 30 CHARACTERS'),
    username: z.string().min(3, { message: 'MINIMUM 3 CHARACTERS' }).max(30, 'MAXIMUM 30 CHARACTERS'),
    bio: z.string().min(3, { message: 'MINIMUM 3 CHARACTERS' }).max(30,  'MAXIMUM 30 CHARACTERS'),
})