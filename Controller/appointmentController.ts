import {Request, Response} from "express";
import { AppointmentData } from "../Interface/appointments";
import Appointments from "../Model/appointmentModel";

//DUMMY DATA
let appointments: AppointmentData[] = [
    { id: 1, date: new Date(), time: 900, description: "Vaccination" },
    { id: 2, date: new Date(), time: 1100, description: "Check-up" }      //date: new Date() = hämtar dagens datum just exakt i det momentet koden körs 
  ];

//CRUD OPERATIONER FÖR BESÖKTIDER 

// Detta hämtar all DATA från DB (i detta fall bokningar)
export const getAppointments = async (req: Request, res: Response) => {
    try {
        const appointments = await Appointments.find();       // Hämtar dokument från DB
        res.json(appointments);                               // Skicka tillbaka dokumenten
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};

// Detta hämtar en specifikt DATA från DB (i detta fall bokningar baserat på ID)
export const getAppointmentById = (req: Request, res: Response) => {
    const appointment = appointments.find(a => a.id === parseInt(req.params.id));
    if(!appointment) {
        res.status(404).json({ message: "This appointment is not found"});
        return;
    }
    res.json(appointment);
}


// Detta lägger till DATA i DB (i detta fall bokningar)
export const addAppointment = (req: Request, res: Response) => { 
     // Kontrollera att alla obligatoriska fält finns
    if (!req.body.date || !req.body.time || req.body.description === undefined) {
        return res.status(400).json({ message: "Id, date, time and description are required." });
    }
    const newAppointment: AppointmentData = {
        id: appointments.length + 1,    // unikt id för bokningar i DB
        date: req.body.date,
        time: req.body.time,
        description: req.body.description,
    };
    appointments.push(newAppointment);
    res.status(201).json(newAppointment);
};


// Detta uppdaterar DATA i DB (i detta fall bokningar)
export const updateAppointment = (req: Request, res: Response) => {
    const appointmentIndex = appointments.findIndex (a => a.id === parseInt(req.params.id));    //(req.param.id) =hämtar index för bokningar som ska uppdateras
    if(appointmentIndex === -1) {                                                       //parseInt(req.params.id) omvandlar id frånstring till int                                           
    res.status(404).json({message: "This appointment is not found"});    
    return;
    }
    appointments[appointmentIndex] = { ...appointments[appointmentIndex], ...req.body};            // (...) = uppdaterar appointment utan att skriva över hela objektet
    res.json({message: "Your appointment has been successfully updated", appointment: appointments[appointmentIndex]});   //(bokningar: bokningars[bokningarIndex) = visar vilken appointment som uppdaterats
}

// Detta tar bort DATA i DB (i detta fall bokningar)
export const deleteAppointment = (req: Request, res: Response) => {
    const appointmentIndex = appointments.findIndex(a=> a.id === parseInt(req.params.id));
    if (appointmentIndex === -1) {
        res.status(404).json({message: "This appointment is not found"});
        return;
    }
    appointments.splice(appointmentIndex, 1);  //splice tar bort ett element från arrayen
    res.json({message: "Your appointment has been successfully deleted"})
}