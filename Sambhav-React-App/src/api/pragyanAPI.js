import axios from "axios";

export const GetAllSector = async () => {
  try {
    // const res = await axios.get("http://10.194.92.116/pragyan/getAllSector?language=en");
    const res = await axios.get("http://10.194.92.116/pragyan/allSector");
    if (res.status === 200) {
      return res?.data;
    }
  } catch (err) {
    console.log("Error: ", err);
  }
};

export const GetAllMinistry = async () => {
  // Function to get all ministries
  try {
    const res = await axios.get(`http://10.194.92.116/pragyan/allMinistry`);
    if (res.status === 200) {
      return res?.data;
    }
  } catch (err) {
    console.log("Error: ", err);
  }
};

export const GetMinistryBySectorCode = async (sectorCode) => {
  try {
    const res = await axios.get(
      `http://10.194.92.116/pragyan/getMinistry?sectorId=${sectorCode}`
    );
    // const res = await axios.get(`http://10.194.92.116/pragyan/allMinistry?sectorId=${sectorCode}`);
    if (res.status === 200) {
      return res?.data;
    }
  } catch (err) {
    console.log("Failed to fetch ministries by sector code: ", err);
  }
};

export const GetAllDepartment = async () => {
  try {
    const res = await axios.get(`http://10.194.92.116/pragyan/allDepartment`);
    if (res.status === 200) {
      return res?.data;
    }
  } catch (err) {
    console.log("Error: ", err);
  }
};

export const GetDepartmentByMinCode = async (ministryCode) => {
  try {
    const res = await axios.get(
      `http://10.194.92.116/pragyan/getDepartment?ministryId=${ministryCode}`
    );
    if (res.status === 200) {
      return res?.data;
    }
  } catch (err) {
    console.log("Error: ", err);
  }
};

export const GetAllState = async () => {
  try {
    const res = await axios.get(`http://10.194.92.116/pragyan/getAllState`);
    if (res.status === 200) {
      return res?.data;
    }
  } catch (err) {
    console.log("Error: ", err);
  }
};

export const GetAllDistrict = async () => {
  try {
    const res = await axios.get(`http://10.194.92.116/pragyan/getAllDistrict`);
    if (res.status === 200) {
      return res?.data;
    }
  } catch (err) {
    console.log("Error: ", err);
  }
};

export const GetDistrictByStateCode = async (stateCode) => {
  try {
    const res = await axios.get(
      `http://10.194.92.116/pragyan/getDistrictByStateCode?stateCode=${stateCode}`
    );
    if (res.status === 200) {
      return res?.data;
    }
  } catch (err) {
    console.log("Error: ", err);
  }
};

export const GetAllProjects = async () => {
  try {
    const res = await axios.get(`http://10.194.92.116/pragyan/getAllProjects`);
    if (res.status === 200) {
      return res?.data;
    }
  } catch (err) {
    console.log("Error: ", err);
  }
};
export const GetAllYears = async () => {
  try {
    const res = await axios.get(`http://10.194.92.116/pragyan/getFinancialYears`);
    if (res.status === 200) {
      return res?.data;
    }
  } catch (err) {
    console.log("Error: ", err);
  }
};

export const GetQuarters = async () => {
  try {
    const res = await axios.get(`http://10.194.92.116/pragyan/getQuarters`);
    if (res.status === 200) {
      return res?.data;
    }
  } catch (err) {
    console.log("Error: ", err);
  }
};

export const GetViewAndDashboadId = async (projectCode) => {
  try {
    // response = {"id":1,"projectCode":1016,"viewName":"pm_awaas_yojana_gramin","dashboardId":"e10cc8ad-eea3-4577-b09d-ac040090ecef","flag":1}
    const res = await axios.get(
      `http://10.194.92.116/pragyan/getViewAndDashboadId?projectCode=${projectCode}`
    );
    if (res.status === 200) {
      return res?.data;
    }
  } catch (err) {
    console.log("Error: ", err);
  }
};

export const GetViewDataDetails = async (projectCode) => {
  try {
    const res = await axios.get(
      `http://10.194.92.116/pragyan/getViewDataDetails?projectCode=${projectCode}`
    );
    if (res.status === 200) {
      return res?.data;
    }
  } catch (err) {
    console.log("Error: ", err);
  }
};

export const GetSchemesForReactApp = async () => {
  try {
    const res = await axios.get(
      `http://10.194.92.116/pragyan/getSchemesForReactApp`
    );
    if (res.status === 200) {
      return res?.data;
    }
  } catch (err) {
    console.log("Error: ", err);
  }
};
export const GetSchemesLogoForReactApp = async (projectCode) => {
  const apiUrl = `http://10.194.92.116/pragyan/getSchemeLogo?schemeCode=${projectCode}`;
  const response = await fetch(apiUrl);
  return response;
};

export const DisplayDataCountInQuarterWise = async () => {
  try {
    const res = await axios.get(
      `http://10.194.92.116/pragyan/displayDataCountInQuarterWise`
    );
    if (res.status === 200) {
      return res?.data;
    }
  } catch (err) {
    console.log("Error: ", err);
  }
};

//  http://10.194.92.116/pragyan/getAllProjects
//  http://10.194.92.116/pragyan/getAllRawDataFromReplica?projectCode=1021
// http://10.194.92.116/pragyan/allSector
// http://10.194.92.116/pragyan/allMinistry
// http://10.194.92.116/pragyan/allDepartment
// http://10.194.92.116/pragyan/getAllState
// http://10.194.92.116/pragyan/getAllDistrict
