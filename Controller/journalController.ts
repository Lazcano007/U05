import { Request, Response } from "express";
import Journals from "../Model/journalModel";
import journalModel from "../Model/journalModel";

//CRUD OPERATIONER FÖR JOURNAL

// Detta hämtar DATA från DB (i detta fall journalen)
export const getJournals = async (req: Request, res: Response) => {
  try {
    const journals = await journalModel.find();
    res.status(200).json(journals);
  } catch (error: any) {
    res
      .status(500)
      .json({
        message: "There's been an error fetching the journal"
      });
  }
};

// Detta hämtar journal för en specifik DATA i DB (i detta fall journalen)
export const getJournalsForPet = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { petId } = req.params;
    const journals = await Journals.find({ petId });
    if (!journals || journals.length === 0) {
      res
        .status(404)
        .json({ message: "There's no journals found for this pet" });
      return;
    }
    res.status(200).json(journals);
    return;
  } catch (error: any) {
    res.status(500).json({ message: "There's been a server error" });
  }
};

// Detta lägger till DATA i DB (i detta fall journalen)
export const createJournal = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { petId, description, treatment, dateDiagnosis, status } = req.body;
    if (!petId || !description || !treatment || !dateDiagnosis || !status) {
      res
        .status(400)
        .json({
          message:
            "The PetId, description, treatment, dateDiagnosis, and status are required."
        });
      return;
    }
    const newJournal = new Journals({
      petId,
      description,
      treatment,
      dateDiagnosis,
      status,
    });
    await newJournal.save();
    res.status(201).json(newJournal);
    return;
  } catch (error: any) {
    res.status(500).json({ message: "There's been a server error" });
  }
};

// Detta uppdaterar DATA i DB (i detta fall journalen)
export const updateJournal = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const updatedJournal = await journalModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedJournal) {
      res.status(404).json({ message: "This journal failed to upadte" });
      return;
    }
    res.json({
      message: "Your journal has been successfully updated",
      journal: updatedJournal,
    });
  } catch (error: any) {
    res.status(500).json({ message: "There's been a server error" });
  }
};

// Detta tar bort DATA i DB (i detta fall journalen)
export const deleteJournal = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const deletedJournal = await journalModel.findByIdAndDelete(id);
    if (!deletedJournal) {
      res.status(404).json({ message: "This journal is not found" });
      return;
    }
    res.json({ message: "Your journal has been successfully deleted" });
  } catch (error: any) {
    res.status(500).json({ message: "There's been a server error" });
  }
};
