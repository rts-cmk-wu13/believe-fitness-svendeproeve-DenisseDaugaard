import z from "zod"

export const baseScheme = z.object({
    name: z.string('Indtast venligst dit navn').min(2, "Your name must include minimun 2 letters"),
    firstname: z.string('Indtast venligst dit navn').min(2, "Your name must include minimun 2 letters"),
    lastname: z.string('Indtast venligst dit efternavn').min(2, "Your last name must include minimun 2 letters"),
    age: z.coerce.number({required_error: "Please write your age",invalid_type_error: "Please write your age",})
    .int("The age must be a whole number")
    .min(1, "The age must be at least 1"),
    username: z.string('Please writte your user name').min(3, "User name must be at lest 3 letters"),
    password: z.string('Please write your password').min(4, "Your password must be at least 4 caracters"),
    confirmPassword: z.string("Please repeat your password"),
    email:z.string("Please enter an email address").email("Invalid email adresse"),
    message: z.string('Please write your message').min(10, "The message must be at least 10 caracters long.")
})

export const newsLetterScheme = baseScheme.pick({
    email:true,
})

export const contactScheme = baseScheme.pick({
    name:true,
    email:true,
    message:true,
})

export const loginSchema = baseScheme.pick({
    username:true,
    password:true,
})

export const CreateUserScheme = baseScheme
  .omit({
    message: true,
    email: true,
    name: true,
  })