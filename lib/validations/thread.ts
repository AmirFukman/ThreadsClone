//this page define the validation for the thread properties 
import * as z from 'zod';

export const ThreadValidation = z.object({
    thread: z.string().nonempty().min(3, { message: 'MINIMUM 3 CHARACTERS' }).max(200,  'MAXIMUM 200 CHARACTERS'),
    accountId: z.string(),    
})

export const CommentValidation = z.object({
    thread: z.string().nonempty().min(3, { message: 'MINIMUM 3 CHARACTERS' }).max(200,  'MAXIMUM 200 CHARACTERS'),
})