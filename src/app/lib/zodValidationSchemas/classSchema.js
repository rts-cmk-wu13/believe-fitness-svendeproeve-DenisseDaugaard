import z from "zod"

export const classScheme = z.object({
    file: z.file().min(1, "Vælg venligst en fil").max(5 * 1024 * 1024, "Filen må ikke være større end 5MB"),
    className: z.string('Indtast venligst dit navn').min(3, "Navn skal være mindst 3 karakterer"),
    classDescription: z.string('Indtast venligst en beskrivelse').min(10, "Beskrivelse skal være mindst 10 karakterer"),
    classDay: z.string('Indtast venligst en ugedag').min(3, "Ugedag skal være mindst 3 karakterer"),
    classTime: z.string('Indtast venligst et tidspunkt').min(3, "Tidspunkt skal være mindst 3 karakterer"),
    maxParticipants: z.coerce.number({required_error: "Indtast venligst et maksimum antal deltagere",
        invalid_type_error: "Indtast venligst et maksimum antal deltagere",})
        .int("Maksimum antal deltagere skal være et helt tal")
        .min(1, "Maksimum antal deltagere skal være mindst 1"),

})

// validate only what exists
export const updateActivityScheme = classScheme.partial(); // name required, others optional
// if you *don't* want to require name, remove `.required({ name: true })`