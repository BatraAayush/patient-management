export const validatePatientInput = (patientInput) => {
  const { name, age, gender, medicalHistory, contact, ward } = patientInput;

  if (!name || !age || !gender || !medicalHistory || !contact || !ward) {
    return false;
  }

  return true;
};
