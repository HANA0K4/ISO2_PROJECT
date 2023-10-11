import Joi from 'joi';
import Boom from '@hapi/boom';
import { BLUR_FILTER, GREYSCALE_FILTER, NEGATIVE_FILTER } from '../../commons/constants.mjs';
import Process from '../../models/Process.mjs';

const PayloadValidation = Joi.object({
    filters: Joi.array().required().min(1).items(Joi.string().valid(NEGATIVE_FILTER, GREYSCALE_FILTER,BLUR_FILTER)),
    images:Joi.array().required().min(1)}).required();
  constructor(processRepository) {
    this.processRepository = processRepository;
  }

const applyFilters = async (files, filters) => {
  try {
    await PayloadValidation.validateAsync(filters, files);
  } catch (error) {
    throw Boom.badData(error.message, { error });
  }

  const filesData = [];

  for (const file of files) {
    const fileData = file.buffer;
    filesData.push(fileData);
  }
  const newProcess = new Process();
  newProcess.files = filesData;
  newProcess.filters = filters;
  await newProcess.save();
  return newProcess;
};

export default applyFilters;
