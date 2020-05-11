import {
  RecapBaseModel,
  RecapWorkExperienceModel,
  RecapEducationModel,
  RecapAccomplishmentsModel,
  RecapPublicationsModel,
  RecapSkillsModel,
  RecapSideProjectsModel,
  RecapOrganizationsModel,
  RecapReferencesModel,
  RecapOtherModel,
  Recap,
} from "./recaps.model";

const RecapsDao = {
  findAllRecaps(userId: string) {
    return RecapBaseModel.find({ userId });
  },

  findRecapById(recapId: string) {
    return RecapBaseModel.findById(recapId);
  },

  findRecapByIdAndUserId({ recapId, userId }: { recapId: string; userId: string }) {
    return RecapBaseModel.findOne({ userId, _id: recapId });
  },

  createRecap(recap: Recap) {
    switch (recap.kind) {
      case "Work Experience":
        const workExperienceRecap = new RecapWorkExperienceModel(recap);
        return workExperienceRecap.save();
      case "Education":
        const educationRecap = new RecapEducationModel(recap);
        return educationRecap.save();
      case "Accomplishments":
        const accomplishmentsRecap = new RecapAccomplishmentsModel(recap);
        return accomplishmentsRecap.save();
      case "Publications":
        const publicationsRecap = new RecapPublicationsModel(recap);
        return publicationsRecap.save();
      case "Skills":
        const skillsRecap = new RecapSkillsModel(recap);
        return skillsRecap.save();
      case "Side Projects":
        const sideProjectsRecap = new RecapSideProjectsModel(recap);
        return sideProjectsRecap.save();
      case "Organizations":
        const organizationsRecap = new RecapOrganizationsModel(recap);
        return organizationsRecap.save();
      case "References":
        const referencesRecap = new RecapReferencesModel(recap);
        return referencesRecap.save();
      case "Other":
        const otherRecap = new RecapOtherModel(recap);
        return otherRecap.save();
      default:
        throw new Error("Failed to find matching recap kind to create!");
    }
  },

  updateRecapById({ recapId, updatedRecap }: { recapId: string; updatedRecap: Recap }) {
    switch (updatedRecap.kind) {
      case "Work Experience":
        return RecapWorkExperienceModel.findOneAndUpdate(
          { _id: recapId },
          { $set: updatedRecap, ...(!updatedRecap.endDate ? { $unset: { endDate: 1 } } : {}) },
          { new: true },
        );
      case "Education":
        return RecapEducationModel.findOneAndUpdate(
          { _id: recapId },
          { $set: updatedRecap, ...(!updatedRecap.endDate ? { $unset: { endDate: 1 } } : {}) },
          { new: true },
        );
      case "Accomplishments":
        return RecapAccomplishmentsModel.findOneAndUpdate({ _id: recapId }, updatedRecap, { new: true });
      case "Publications":
        return RecapPublicationsModel.findOneAndUpdate({ _id: recapId }, updatedRecap, { new: true });
      case "Skills":
        return RecapSkillsModel.findOneAndUpdate({ _id: recapId }, updatedRecap, { new: true });
      case "Side Projects":
        return RecapSideProjectsModel.findOneAndUpdate(
          { _id: recapId },
          { $set: updatedRecap, ...(!updatedRecap.endDate ? { $unset: { endDate: 1 } } : {}) },
          { new: true },
        );
      case "Organizations":
        return RecapOrganizationsModel.findOneAndUpdate(
          { _id: recapId },
          { $set: updatedRecap, ...(!updatedRecap.endDate ? { $unset: { endDate: 1 } } : {}) },
          { new: true },
        );
      case "References":
        return RecapReferencesModel.findOneAndUpdate({ _id: recapId }, updatedRecap, { new: true });
      case "Other":
        return RecapOtherModel.findOneAndUpdate({ _id: recapId }, updatedRecap, { new: true });
      default:
        throw new Error("Failed to find matching recap kind to update!");
    }
  },

  removeRecapById(recapId: string) {
    return RecapBaseModel.findByIdAndDelete({ _id: recapId });
  },
};

export default RecapsDao;
