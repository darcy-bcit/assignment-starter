import { z } from "zod";

//Schema we're using to validate C style 
const cSyntaxSchema = z.string()
  .min(1, "Input cannot be empty")
  .regex(/^[a-zA-Z0-9_+\-*/=;{}()\[\]\s]+$/, "Invalid characters found")
  .refine((input) => {
    //Dealing with white space
    const lines = input.trim().split("\n");
    return lines.every(line => !line.trim().match(/^\d/));
    //Helpful user facing messages 
  }, { message: "Identifiers cannot start with a number" });

//Pass user input to this helper function to validate it.
export function validateCInput(userInput) {
  const result = cSyntaxSchema.safeParse(userInput);
  return result.success ? { valid: true, errors: [] } : { valid: false, errors: result.error.format() };
}
