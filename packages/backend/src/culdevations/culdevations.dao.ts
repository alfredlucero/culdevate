import CuldevationModel, { Culdevation } from "./culdevations.model";

// This DAO is for example purposes only
// Define the Data Accesss Object, where we actually make MongoDB calls to the backend to decouple
// accessing lower-level APIs and provide mocking for unit tests
const CuldevationsDao = {
  findAllCuldevations() {
    return CuldevationModel.find();
  },

  findCuldevationById(culdevationId: string) {
    return CuldevationModel.findById(culdevationId);
  },

  createCuldevation(culdevation: Culdevation) {
    const createdCuldevation = new CuldevationModel(culdevation);

    return createdCuldevation.save();
  },

  updateCuldevationById(culdevationId: string, updatedCuldevation: Culdevation) {
    return CuldevationModel.findOneAndUpdate({ _id: culdevationId }, updatedCuldevation, { new: true });
  },

  removeCuldevationById(culdevationId: string) {
    return CuldevationModel.findByIdAndDelete({ _id: culdevationId });
  },
};

export default CuldevationsDao;
