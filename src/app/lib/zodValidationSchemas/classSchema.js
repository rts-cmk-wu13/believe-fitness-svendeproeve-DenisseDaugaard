import z from "zod"


export const classScheme = z.object({
    file: z.file().min(1, "Please choose a file").max(5 * 1024 * 1024, "The file must be less than 5MB"),
    className: z.string('Please add a name to this class').min(3, "The name is too short"),
    classDescription: z.string('Please add a description').min(10, "The description is too short"),
    classDay: z.string().refine(value => ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].includes(value), {
        message: "Please select a valid day"
    }),
    classTime: z.string('Please add a time'),
    maxParticipants: z.coerce.number({required_error: "Please add a maximum number of participants",
        invalid_type_error: "Please add a maximum number of participants",})
        .int("The maximum number of participants must be an integer")
        .min(1, "The maximum number of participants must be at least 1"),
    id: z.coerce.number().optional(),
    trainerId: z.coerce.number().optional(),
    assetId: z.coerce.number().optional(),
})


export const createClassSchema = classScheme
  .omit({
    id: true,
    trainerId: true,
  })
  .extend({
    trainerId: z.coerce.number({
      required_error: "Please choose a trainer",
      invalid_type_error: "Please choose a trainer",
    }).min(1, "Please choose a trainer"),
  })