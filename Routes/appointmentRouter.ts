import express from "express";
import { getAppointments, getAppointmentById, createAppointment, updateAppointment, deleteAppointment } from "../Controller/appointmentController";

const appoinmentRouter = express.Router();

appoinmentRouter.get("/pet/:petId", getAppointments)
appoinmentRouter.post("/create", createAppointment)
appoinmentRouter.put("/update/:id", updateAppointment)
appoinmentRouter.delete("/delete/:id", deleteAppointment)



export default appoinmentRouter;