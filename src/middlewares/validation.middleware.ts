import {Request, Response, NextFunction} from "express"
import {ZodType, ZodError} from "zod"

export const validate = (schema: ZodType) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            const validatedData = schema.parse(req.body)
            req.body = validatedData
            next()
        } catch (err) {
            if (err instanceof ZodError) {
                return res.status(400).json({
                    message: "Validation failed",
                    errors: err.issues.map(errors => ({
                        field: errors.path.join(","),
                        message: errors.message
                    }))
                })
            }

            return res.status(500).json({
                message: "Internal Server Error"
            })
        }
    }
}