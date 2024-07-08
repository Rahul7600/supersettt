import React, { useState, useEffect, useRef } from "react";
import Select from "react-select";
import {
  GetAllSector,
  GetAllMinistry,
  GetMinistryBySectorCode,
  GetAllDepartment,
  GetDepartmentByMinCode,
  GetAllState,
  GetAllDistrict,
  GetDistrictByStateCode,
  GetViewAndDashboadId,
  GetSchemesForReactApp,
  GetSchemesLogoForReactApp,
} from "../api/pragyanAPI";
import Reset from "../assets/images/reset_icon.svg";
import { useNavigate } from "react-router-dom";
import View_icon from "../assets/images/view_icon.svg";
import Header from "../components/layout/header";
import Footer from "../components/layout/footer";
import Back from "../assets/images/back.svg";
import report from "../assets/images/report.svg";
import { Image } from "react-bootstrap";

const Dashboard = () => {
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [logoMapping, setLogoMapping] = useState({});
  // const { sectorCode, ministryCode, stateCode,  } = useParams();

  const [sectorOptions, setSectorOptions] = useState([]);
  const [ministryOptions, setMinistryOptions] = useState([]);
  const [departmentOptions, setDepartmentOptions] = useState([]);
  const [stateOptions, setStateOptions] = useState([]);
  const [districtOptions, setDistrictOptions] = useState([]);

  const [selectedSector, setSelectedSector] = useState(null);
  const [selectedMinistry, setSelectedMinistry] = useState();
  const [selectedDepartment, setSelectedDepartment] = useState();
  const [selectedState, setSelectedState] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [error, setError] = useState(null);
  const [newData, setNewData] = useState([]);

  const options = [
    {
      label: "All",
      value: "All",
    },
    {
      label: "API",
      value: "API",
    },
    {
      label: "Excel",
      value: "Excel",
    },
  ];
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const selectInputRef = useRef();
  // const [isChecked, setIsChecked] = useState(false);

  const handleViewClick = async (projectID) => {
    const a = await GetViewAndDashboadId(projectID);
    console.log("projectID:", projectID, a);
    const dbId = a.dashboardId;

    if (dbId) {
      navigate(`/superset/dashboard/${dbId}`);
    } else {
      alert("No data available");
    }
  };

  const fetchSectors = async () => {
    try {
      const data = await GetAllSector();
      const options = data.map((sector) => ({
        value: sector.sectorCode,
        label: sector.sectorName,
      }));
      setSectorOptions(options);
    } catch (error) {
      console.error("Error fetching sector data:", error);
    }
  };
  const fetchStates = async () => {
    try {
      const data = await GetAllState();
      const options = data.map((state) => ({
        value: state.stateCode,
        label: state.stateName,
      }));
      setStateOptions(options);
    } catch (error) {
      console.error("Error fetching state data:", error);
    }
  };
  useEffect(() => {
    fetchSectors();
    fetchMinistries();
    fetchDepartments();
    fetchStates();
    fetchDistricts();
  }, []);

  const handleSectors = (selectedOption) => {
    setSelectedSector(selectedOption);
    fetchMinistries(selectedOption.value);
    setSelectedMinistry(null);
    setSelectedDistrict(null);
    setSelectedDepartment(null);
  };

  const handleStates = (selectedOption) => {
    setSelectedState(selectedOption);
    setSelectedDistrict(null);
    if (selectedOption) {
      fetchDistricts(selectedOption.value);
    }
  };

  const fetchDistricts = async (stateCode) => {
    try {
      let data;
      if (stateCode) {
        data = await GetDistrictByStateCode(stateCode);
        // console.log("GetDistrictByStateCode", data)
      } else {
        data = await GetAllDistrict();
      }
      const options = data.map((district) => ({
        value: district.distCode,
        label: district.distName,
      }));
      setDistrictOptions(options);
    } catch (error) {
      console.error("Error fetching district data:", error);
    }
  };

  const handleDistrict = (selectedOption) => {
    setSelectedDistrict(selectedOption);
  };

  const fetchMinistries = async (sectorCode) => {
    try {
      let data;
      if (sectorCode) {
        data = await GetMinistryBySectorCode(sectorCode);
        console.log("GetMinistryBySectorCode", data);
      } else {
        data = await GetAllMinistry();
      }
      const options = data.map((ministry) => ({
        value: ministry.ministryCode,
        label: ministry.ministryName,
      }));
      setMinistryOptions(options);
    } catch (error) {
      console.error("Error fetching ministry data:", error);
    }
  };

  const handleMinistry = (selectedOption) => {
    setSelectedMinistry(selectedOption);
    fetchDepartments(selectedOption.value);
    console.log("fetchDepartments", selectedOption);
  };

  const fetchDepartments = async (ministryCode) => {
    try {
      let data;
      if (ministryCode) {
        data = await GetDepartmentByMinCode(ministryCode);
      } else {
        data = await GetAllDepartment();
      }
      const options = data.map((department) => ({
        value: department.departmentCode,
        label: department.departmentName,
      }));
      setDepartmentOptions(options);
    } catch (error) {
      console.error("Error fetching ministry data:", error);
    }
  };

  const handleDepartment = (selectedOption) => {
    setSelectedDepartment(selectedOption);
    // console.log("Dept Option", selectedOption);
  };

  const handleClear = () => {
    if (selectInputRef.current && selectInputRef.current.select) {
      selectInputRef.current.select.clearValue();
    }
    setSelectedMinistry(null);
    setSelectedDepartment(null);
    setSelectedSector(null);
    setSelectedState(null);
    setSelectedDistrict(null);
    setSelectedOption(options[0]);
    navigate(`/dashboard`);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "short" });
    const year = date.getFullYear().toString().slice(-2);

    return `${day} ${month} ${year}`;
  };

  const formatFrequency = (data_freq) => {
    return data_freq.charAt();
  };

  function formatGranularity(granularity) {
    const parts = granularity.split("->");
    const status = parts[parts.length - 1];
    // console.log("status", status);
    if (status === "Sambhav Location") {
      return "GPVC";
    }
    return status;
  }

  const formatUnit = (KPIUnit) => {
    if (KPIUnit === "Thousands" || KPIUnit === "Thousand")
      return KPIUnit.substring(0, 2);
    else if (KPIUnit === "Crores" || KPIUnit === "Crore")
      return KPIUnit.substring(0, 2);
    else if (
      KPIUnit === "Lakhs" ||
      KPIUnit === "Lakh" ||
      KPIUnit === "Lacs" ||
      KPIUnit === "Lac"
    )
      return "L";
    else if (KPIUnit === "Percentage") return "%";
    else return KPIUnit;
  };

  const formatValue = (KPIValue) => {
    if (KPIValue === "" || KPIValue === null) return 0;
    else return KPIValue;
  };

  const fetchData = async (stateCode, distCode) => {
    try {
      const response = await GetSchemesForReactApp();
      const data = response;

      console.log("Response", data);
      const formattedData = data.map((item) => {
        const indicator1 = distCode
          ? item.no_indicator_1_district_level
          : stateCode
          ? item.no_indicator_1_state_level
          : item.no_indicator_1_national_level;
        const indicator2 = distCode
          ? item.no_indicator_2_district_level
          : stateCode
          ? item.no_indicator_2_state_level
          : item.no_indicator_2_national_level;
        const unit1 = distCode
          ? item.unit_indicator_1_district_level
          : stateCode
          ? item.unit_indicator_1_state_level
          : item.unit_indicator_1_national_level;
        const unit2 = distCode
          ? item.unit_indicator_2_district_level
          : stateCode
          ? item.unit_indicator_2_state_level
          : item.unit_indicator_2_national_level;

        return {
          ...item,
          date_from: formatDate(item.date_from),
          date_to: formatDate(item.date_to),
          granularity: formatGranularity(item.granularity),
          data_freq: formatFrequency(item.data_freq),

          indicator1: indicator1 !== null ? formatValue(indicator1) : null,
          indicator2: indicator2 !== null ? formatValue(indicator2) : null,
          unit1: indicator1 !== null ? formatUnit(unit1) : " ",
          unit2: indicator2 !== null ? formatUnit(unit2) : " ",
        };
      });

      setData(formattedData);
      setNewData(formattedData);
      setLoading(false);
      // for (const item of formattedData) {
      //   const projectCode = item.project_code;
      //   // try {
      //     const secondApiResponse = await GetSchemesLogoForReactApp(
      //       projectCode
      //     );
      //     if (!secondApiResponse.ok) {
      //       throw new Error(`HTTP error! Status: ${secondApiResponse.status}`);
      //     }
      //     const blob = await secondApiResponse.blob();
      //     const imageUrl = URL.createObjectURL(blob);
      //     setLogoMapping((prevMapping) => ({
      //       ...prevMapping,
      //       [projectCode]: imageUrl,
      //     }));
      //   // } catch (error) {
      //   //   setError(error);
      //   //   setLoading(false);
      //   //   console.error("Error in API call:", error);
      //   // }
      // }
    } catch (error) {
      setError(error);
      setLoading(false);
      console.error("Error in API call:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getCellStyle = (portMode) => {
    switch (portMode) {
      case 1:
        return { backgroundColor: "#f9fff0", border: "1px solid #8cc739" };
      case 2:
        return { backgroundColor: "#e9f4ff", border: " 1px solid #8ccafb" };
      default:
        return { backgroundColor: "white" };
    }
  };

  const getOnDateStyle = (portMode) => {
    switch (portMode) {
      case 1:
        return { backgroundColor: "#4a7312" };
      case 2:
        return { backgroundColor: "#1a6cad" };
      default:
        return { backgroundColor: "#1a6cad" };
    }
  };

  const handleAPIMode = (selectedOption) => {
    setSelectedOption(selectedOption);
  };

  const viewFunction = (item, i) => {
    return (
      <div key={i} className="col-lg-3 col-md-4 col-sm-6 col-xs-12 mb-4">
        <div className="tiles_container" style={getCellStyle(item.port_mode)}>
          <div className="scheme__name">
            <a className="scheme_logo" alt="" title="View Native Dashboard">
              {/* <img
                src={logoMapping[item.project_code]}
                alt={`Logo for Project Code ${item.project_code}`}
              /> */}
            </a>
            <h6 className="mb-0 mx-2">{item.project_full_name}</h6>
          </div>
          <div className="kpi_box py-2">
            <table className="kpi_table mb-2">
              <tbody>
                <tr>
                  <td className="">{item.kpi_name_1}</td>
                  <td>
                    <p className="scheme__value mb-0">
                      {item.indicator1} {item.unit1}
                    </p>
                  </td>
                </tr>
                {/* <tr>
                  <td>{item.kpi_name_2}</td>
                  <td>
                    <p className="scheme__value mb-0">
                      {item.indicator2} {item.unit2}
                    </p>
                  </td>
                </tr> */}
              </tbody>
            </table>
          </div>
          <div className="date_footer">
            <p className="mb-0 frequency_box">
              <span>{item.data_freq}</span> <span>{item.granularity}</span>{" "}
              <span>{item.ministry_dgqi}</span>
            </p>
            <p
              className="mb-0 as_ondate"
              style={getOnDateStyle(item.port_mode)}
            >
              {item.date_from} - {item.date_to}
            </p>
          </div>
          <div className="on_hover">
            <div className="h_box">
              <a>
                <button onClick={() => handleViewClick(item.project_code)}>
                  <img className="view_btn" src={View_icon} alt="view" /> View
                  Dashboard{" "}
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  };

  useEffect(() => {
    if (selectedOption.value === "All") {
      setNewData(data);
    } else if (selectedOption.value === 1) {
      const filteredData = data.filter(
        (item) => item.port_mode === selectedOption.value
      );
      setNewData(filteredData);
    } else if (selectedOption.value === 2) {
      const filteredData = data.filter(
        (item) => item.port_mode === selectedOption.value
      );
      setNewData(filteredData);
    }
  }, [selectedOption, newData]);

  const renderView = () => {
    if (loading) {
      return <div>Loading...</div>;
    }

    if (error) {
      return <div>Error: {error.message}</div>;
    }

    return newData?.map((item) => viewFunction(item));
  };

  return (
    <>
      <Header />
      <section className="BI__product__container">
        <div className="dropdown__header">
          <div className="container-fluid mb-2">
            <div className="flex row">
              <div className="d-flex align-items-center justify-start py-1 px-3 col-lg-9 col-md-9 px-0">
                <div className="row w-100">
                  <div className="btnbox px-1">
                    <a href="/sambhavDashboard" className="NEbtn back_btn px-2">
                      <img src={Back} alt="reset icon" /> Back
                    </a>
                  </div>
                  <div className="col px-1 select-container">
                    <Select
                      value={selectedSector}
                      placeholder="Select Sector"
                      options={sectorOptions}
                      onChange={handleSectors}
                    />
                  </div>
                  <div className="col px-1 select-container">
                    <Select
                      value={selectedMinistry}
                      placeholder="Select Ministry"
                      options={ministryOptions}
                      onChange={handleMinistry}
                    />
                  </div>
                  <div className="col px-1 select-container">
                    <Select
                      value={selectedDepartment}
                      placeholder="Select Department"
                      options={departmentOptions}
                      onChange={handleDepartment}
                    />
                  </div>
                  <div className="col px-1 select-container">
                    <Select
                      value={selectedState}
                      placeholder="Select State"
                      options={stateOptions}
                      onChange={handleStates}
                    />
                  </div>
                  <div className="col px-1 select-container">
                    <Select
                      value={selectedDistrict}
                      placeholder="Select District"
                      options={districtOptions}
                      onChange={handleDistrict}
                    />
                  </div>
                  <div className="box_reset px-1">
                    <button
                      className="NEbtn reset_btn px-2"
                      onClick={() => handleClear("")}
                      title="Reset Filter"
                    >
                      <img src={Reset} alt="reset icon" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-end col-lg-3 col-md-3 px-0">
                <div className="row py-2">
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <div className="APImode">
                      <Select
                        value={selectedOption}
                        onChange={handleAPIMode}
                        options={[
                          { label: "All", value: "All" },
                          { label: "API", value: 1 },
                          { label: "Excel", value: 2 },
                        ]}
                      />
                    </div>
                    <div className="reportBtn">
                      <a href="/projectReport" style={{ width: "100px" }}>
                        <Image src={report} alt="Datalog" /> &nbsp; Report
                      </a>
                    </div>
                  </div>
                  {/* <div className="col d-flex justify-content-end px-0">
                     <div className="col">
                      <input
                        type="search"
                        placeholder="Search..."
                        className="form-control "
                        value=""
                      />
                    </div> 
                  </div>*/}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="dept_color1 dept_container">
          <div className="container-fluid">
            <div className="row CKR_pad">{renderView()}</div>
          </div>
        </div>
      </section>
      <Footer className="overview_pad prayas__ml_250" />
    </>
  );
};

export default Dashboard;
