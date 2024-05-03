import "express-async-errors";
// if any api fails then the whole server will be down. to avoid that and to keep server running even in any error, we can use try catch for each and every method.
// or else we can use the above package. i will handle the errors and also will keep server running
import Job from "../models/JobModel.js";
import { StatusCodes } from "http-status-codes";

export const getAllJobs = async (req, res) => {
  const allJobs = await Job.find({});
  res.status(StatusCodes.OK).json({ allJobs });
};

export const createJob = async (req, res) => {
  const { company, position, jobStatus, jobType, jobLocation } = req.body;
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};

export const getJob = async (req, res) => {
  const { id } = req.params;
  const job = await Job.findById(id);
  res.status(StatusCodes.OK).json({ job });
};

export const updateJob = async (req, res) => {
  const { id } = req.params;

  const updatedJob = await Job.findByIdAndUpdate(id, req.body, {
    new: true,
  });


  res.status(StatusCodes.OK).json({ job: updatedJob });
};

export const deleteJob = async (req, res) => {
  const { id } = req.params;
  const removedJob = await Job.findByIdAndDelete(id);

  res.status(StatusCodes.OK).json({ job: removedJob });
};
