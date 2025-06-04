import { User } from "../../../../../core/models";
import { Student } from "../../students/models/student";

export interface List {
    id?: number,
    userId: string,
    studentId: string,
    user?: User,
    student?: Student,
}