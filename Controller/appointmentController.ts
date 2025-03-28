import { Request, Response } from "express";
import appointmentModel from "../Model/appointmentModel";
import Appointment from "../Model/appointmentModel";

//CRUD OPERATIONER FÖR BESÖKTIDER

// Detta hämtar all DATA från DB (i detta fall bokningar)
export const getAppointments = async (req: Request, res: Response) => {
  try {
    const appointments = await appointmentModel.find();
    res.status(200).json(appointments);
  } catch (error: any) {
    res.status(500).json({
      message: "Theres been an error fetching your appointment"
    });
  }
};

// Detta hämtar en specifikt DATA från DB (i detta fall bokningar baserat på ID)
export const getAppointmentById = async (req: Request, res: Response) => {
  try {
    const appointment = await appointmentModel.findById(req.params.id);
    if (!appointment) {
      res.status(404).json({ message: "This appointment is not found" });
      return;
    }
    res.json(appointment);
  } catch (error: any) {
    res.status(500).json({
      message: "Theres been an error fetching your appointment"
    });
  }
};

// Detta lägger till DATA i DB (i detta fall bokningar)
export const createAppointment = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { petId, userId, date, time, description } = req.body;
    if (!petId || !userId || !date || !time || description === undefined) {
      res.status(400).json({
        message: "The PetId, UserId, date, time and description are required."
      });
      return;
    }
    const newAppointment = new Appointment({
      petId,
      userId,
      date,
      time,
      description,
    });
    await newAppointment.save();
    res.status(201).json(newAppointment);
  } catch (error: any) {
    res.status(500).json({ message: "There's been a server error" });
  }
};

// Detta uppdaterar DATA i DB (i detta fall bokningar)
export const updateAppointment = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const updateAppointment = await appointmentModel.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );
    if (!updateAppointment) {
      res.status(404).json({ message: "This appointment is not found" });
      return;
    }
    res.json({
      message: "Your appointment has been successfully updated",
      appointment: updateAppointment,
    });
  } catch (error: any) {
    res.status(500).json({ message: "Theres been a server error" });
  }
};

// Detta tar bort DATA i DB (i detta fall bokningar)
export const deleteAppointment = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const deletedAppointment = await appointmentModel.findByIdAndDelete(id);
    if (!deletedAppointment) {
      res.status(404).json({ message: "This appointment is not found" });
      return;
    }
    res.json({ message: "Your appointment has been successfully deleted" });
  } catch (error: any) {
    res.status(500).json({ message: "There's been a server error" });
  }
};
