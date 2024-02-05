console.log("This is my Login2Xplore assignment");

const jpdbBaseURL = "http://api.login2explore.com:5577";
const jpdbIRL = "/api/irl";
const jpdbIML = "/api/iml";
const empDBName = "SCHOOL-DB";
const empRelationName = "STUDENT-TABLE";
const connToken = "90931744|-31949307231931541|90963389";

//Function saveRecNo2LS
const saveRecNo2LS = (jsonObj) => {
  const lvData = JSON.parse(jsonObj.data);
  localStorage.setItem("recno", lvData.rec_no);
};

//Function getRollNoAsJsonObj
const getRollNoAsJsonObj = () => {
  const rollno = $("#rollno").val();
  return JSON.stringify({ id: rollno });
};

//Function fillData
const fillData = (jsonObj) => {
  saveRecNo2LS(jsonObj);
  const record = JSON.parse(jsonObj.data).record;
  $("#studentName").val(record.name);
  $("#studentClass").val(record.class);
  $("#birthDate").val(record.birthDate);
  $("#address").val(record.address);
  $("#enrollmentDate").val(record.enrollmentDate);
};

//Function resetForm
const resetForm = () => {
  $(
    "#rollno, #studentName, #studentClass, #birthDate, #address, #enrollmentDate"
  ).val("");
  $("#rollno").prop("disabled", false);
  $("#save, #change, #reset").prop("disabled", true);
  $("#rollno").focus();
};

//Function validateData
const validateData = () => {
  const rollno = $("#rollno").val();
  const studentName = $("#studentName").val();
  const studentClass = $("#studentClass").val();
  const birthDate = $("#birthDate").val();
  const address = $("#address").val();
  const enrollmentDate = $("#enrollmentDate").val();

  if (!rollno) {
    alert("Roll No. is missing");
    $("#rollno").focus();
    return "";
  }

  if (!studentName) {
    alert("Student name is missing");
    $("#studentName").focus();
    return "";
  }

  if (!studentClass) {
    alert("Student class is missing");
    $("#studentClass").focus();
    return "";
  }

  if (!birthDate) {
    alert("Date of birth is missing");
    $("#birthDate").focus();
    return "";
  }

  if (!address) {
    alert("Address is missing");
    $("#address").focus();
    return "";
  }

  if (!enrollmentDate) {
    alert("Date of enrollment is missing");
    $("#enrollmentDate").focus();
    return "";
  }

  const jsonStrObj = {
    id: rollno,
    name: studentName,
    class: studentClass,
    birthDate,
    address,
    enrollmentDate,
  };

  return JSON.stringify(jsonStrObj);
};

//Function getStudent
const getStudent = () => {
  const rollJsonObj = getRollNoAsJsonObj();
  const getRequest = createGET_BY_KEYRequest(
    connToken,
    empDBName,
    empRelationName,
    rollJsonObj
  );
  jQuery.ajaxSetup({ async: false });
  const resJsonObj = executeCommandAtGivenBaseUrl(
    getRequest,
    jpdbBaseURL,
    jpdbIRL
  );
  console.log(resJsonObj);
  jQuery.ajaxSetup({ async: true });

  if (resJsonObj.status === 400) {
    $("#save, #reset").prop("disabled", false);
    $("#studentName").focus();
  } else if (resJsonObj.status === 200) {
    $("#empio").prop("disabled", true);
    fillData(resJsonObj);
    $("#change, #reset").prop("disabled", false);
    $("#studentName").focus();
  }
};

//Function saveData
const saveData = () => {
  const jsonStrObj = validateData();
  if (!jsonStrObj) return "";

  const putRequest = createPUTRequest(
    connToken,
    jsonStrObj,
    empDBName,
    empRelationName
  );
  jQuery.ajaxSetup({ async: false });
  const resJsonObj = executeCommandAtGivenBaseUrl(
    putRequest,
    jpdbBaseURL,
    jpdbIML
  );
  jQuery.ajaxSetup({ async: true });

  $("#studentClass").val("");
  resetForm();
  $("#rollno").focus();
};

//Function changeData
const changeData = () => {
  $("#change").prop("disabled", true);
  const jsonChg = validateData();
  const updateRequest = createUPDATERecordRequest(
    connToken,
    jsonChg,
    empDBName,
    empRelationName,
    localStorage.getItem("recno")
  );
  jQuery.ajaxSetup({ async: false });
  const resJsonObj = executeCommandAtGivenBaseUrl(
    updateRequest,
    jpdbBaseURL,
    jpdbIML
  );
  jQuery.ajaxSetup({ async: true });
  console.log(resJsonObj);
  resetForm();
  $("#rollno").focus();
};
