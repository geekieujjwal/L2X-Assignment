console.log("This is my Login2Xplore assignment");

var jpdbBaseURL = "http://api.login2explore.com:5577";
var jpdbIRL = "/api/irl";
var jpdbIML = "/api/iml";
var empDBName = "SCHOOL-DB";
var empRelationName = "STUDENT-TABLE";
var connToken = "90931744|-31949307231931541|90963389";

//Function saveRecNo2LS
function saveRecNo2LS(jsonObj) {
  var lvData = JSON.parse(jsonObj.data);
  localStorage.setItem("recno", lvData.rec_no);
}

//Function getRollNoAsJsonObj
function getRollNoAsJsonObj() {
  var rollno = $("#rollno").val();
  var jsonStr = {
    id: rollno,
  };
  return JSON.stringify(jsonStr);
}

//Function fillData
function fillData(jsonObj) {
  saveRecNo2LS(jsonObj);
  var record = JSON.parse(jsonObj.data).record;
  $("#studentName").val(record.name);
  $("#studentClass").val(record.class);
  $("#birthDate").val(record.birthDate);
  $("#address").val(record.address);
  $("#enrollmentDate").val(record.enrollmentDate);
}

//Function resetForm
function resetForm() {
  $("#rollno").val("");
  $("#studentName").val("");
  $("#studentClass").val("");
  $("#birthDate").val("");
  $("#address").val("");
  $("#enrollmentDate").val("");
  $("#rollno").prop("disabled", false);
  $("#save").prop("disabled", true);
  $("#change").prop("disabled", true);
  $("#reset").prop("disabled", true);
  $("#rollno").focus();
}

//Function validateData
function validateData() {
  var rollno, studentName, studentClass, birthDate, address, enrollmentDate;
  rollno = $("#rollno").val();
  studentName = $("#studentName").val();
  studentClass = $("#studentClass").val();
  birthDate = $("#birthDate").val();
  address = $("#address").val();
  enrollmentDate = $("#enrollmentDate").val();
  if (rollno === "") {
    alert("Roll No. is missing");
    $("#rollno").focus();
    return "";
  }

  if (studentName === "") {
    alert("Student name is missing");
    $("#studentName").focus();
    return "";
  }

  if (studentClass === "") {
    alert("Student class is missing");
    $("#studentClass").focus();
    return "";
  }
  if (birthDate === "") {
    alert("Date of birth is missing");
    $("#birthDate").focus();
    return "";
  }
  if (address === "") {
    alert("Address is missing");
    $("#address").focus();
    return "";
  }
  if (enrollmentDate === "") {
    alert("Date of enrollment is missing");
    $("#enrollmentDate").focus();
    return "";
  }
  var jsonStrObj = {
    id: rollno,
    name: studentName,
    class: studentClass,
    birthDate: birthDate,
    address: address,
    enrollmentDate: enrollmentDate,
  };
  return JSON.stringify(jsonStrObj);
}

//Function getStudent
function getStudent() {
  var rollJsonObj = getRollNoAsJsonObj();
  var getRequest = createGET_BY_KEYRequest(
    connToken,
    empDBName,
    empRelationName,
    rollJsonObj
  );
  jQuery.ajaxSetup({ async: false });
  var resJsonObj = executeCommandAtGivenBaseUrl(
    getRequest,
    jpdbBaseURL,
    jpdbIRL
  );
  console.log(resJsonObj);
  jQuery.ajaxSetup({ async: true });
  if (resJsonObj.status === 400) {
    $("#save").prop("disabled", false);
    $("#reset").prop("disabled", false);
    $("#studentName").focus();
  } else if (resJsonObj.status === 200) {
    $("#empio").prop("disabled", true);
    fillData(resJsonObj);
    $("#change").prop("disabled", false);
    $("#reset").prop("disabled", false);
    $("#studentName").focus();
  }
}

//Function saveData
function saveData() {
  var jsonStrObj = validateData();
  if (jsonStrObj === "") {
    return "";
  }
  var putRequest = createPUTRequest(
    connToken,
    jsonStrObj,
    empDBName,
    empRelationName
  );
  jQuery.ajaxSetup({ async: false });
  var resJsonObj = executeCommandAtGivenBaseUrl(
    putRequest,
    jpdbBaseURL,
    jpdbIML
  );
  jQuery.ajaxSetup({ async: true });
  // Empty the basic studentClass field
  $("#studentClass").val("");
  resetForm();
  $("#rollno").focus();
}

//Function changeData
function changeData() {
  $("#change").prop("disabled", true);
  jsonChg = validateData();
  var updateRequest = createUPDATERecordRequest(
    connToken,
    jsonChg,
    empDBName,
    empRelationName,
    localStorage.getItem("recno")
  );
  jQuery.ajaxSetup({ async: false });
  var resJsonObj = executeCommandAtGivenBaseUrl(
    updateRequest,
    jpdbBaseURL,
    jpdbIML
  );
  jQuery.ajaxSetup({ async: true });
  console.log(resJsonObj);
  resetForm();
  $("#rollno").focus();
}
