import axios from "axios";
import { useState } from "react";

export default function AddEmployee() {
  const [step, setStep] = useState(1);

  /* ================= STATES ================= */

  const [basic, setBasic] = useState({
    userName: "",
    gender: "",
    dob: "",
    mobile_number: "",
    email: "",
    marital_status: "",
    date_of_joining: "",
    employee_status: ""
  });

  const [family, setFamily] = useState({
    father_name: "",
    mother_name: "",
    emergency_contect_name: "",
    emergency_contact_relation: "",
    emergency_contact_number: ""
  });

  const [work, setWork] = useState({
    departmentName: "",
    designation: "",
    reporting_manager: "",
    employment_type: "",
    work_location: "",
    shift_timing: "",
    work_mode: "",
    salary: "",
    status: "ACTIVE"
  });

  const [auth, setAuth] = useState({
    userName: "",
    password: "",
    role: "EMPLOYEE"
  });

  /* ================= SUBMIT ================= */

  const handleFinalSubmit = async () => {
    try {
    

      
    const res=  await axios.post(`http://localhost:8080/api/register`, {
        userName: auth.userName,
        password: auth.password,
        role: "EMPLOYEE",
        
      });

      const empId=res.data.userId;

      console.log("empId",empId);
      const empRes = await axios.post(
        `http://localhost:8080/api/emp/addEmployee/${empId}`,
        { basic, family, work },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json"
          }
        }
      );

      


      alert("Employee created successfully");
      setStep(1);
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h2 style={styles.title}>Add Employee</h2>

        {/* STEPS */}
        <div style={styles.steps}>
          {["Basic", "Family", "Work", "Login"].map((s, i) => (
            <div
              key={s}
              style={step === i + 1 ? styles.stepActive : styles.step}
            >
              {s}
            </div>
          ))}
        </div>

        {/* STEP 1 */}
        {step === 1 && (
          <div style={styles.form}>
            <Input label="Name" value={basic.userName} onChange={e => setBasic({ ...basic, userName: e.target.value })} />
            <Select label="Gender" value={basic.gender} onChange={e => setBasic({ ...basic, gender: e.target.value })} options={["Male","Female","Other"]} />
            <Input type="date" label="DOB" value={basic.dob} onChange={e => setBasic({ ...basic, dob: e.target.value })} />
            <Input label="Mobile" value={basic.mobile_number} onChange={e => setBasic({ ...basic, mobile_number: e.target.value })} />
            <Input label="Email" value={basic.email} onChange={e => setBasic({ ...basic, email: e.target.value })} />
            <Select label="Marital Status" value={basic.marital_status} onChange={e => setBasic({ ...basic, marital_status: e.target.value })} options={["Married","Unmarried"]} />
            <Input type="date" label="Joining Date" value={basic.date_of_joining} onChange={e => setBasic({ ...basic, date_of_joining: e.target.value })} />
            {/* <Select label="Employee Status" value={basic.employee_status} onChange={e => setBasic({ ...basic, employee_status: e.target.value })} options={["Active"]} /> */}
          </div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <div style={styles.form}>
            <Input label="Father Name" value={family.father_name} onChange={e => setFamily({ ...family, father_name: e.target.value })} />
            <Input label="Mother Name" value={family.mother_name} onChange={e => setFamily({ ...family, mother_name: e.target.value })} />
            <Input label="Emergency Name" value={family.emergency_contect_name} onChange={e => setFamily({ ...family, emergency_contect_name: e.target.value })} />
            <Select label="Relation" value={family.emergency_contact_relation} onChange={e => setFamily({ ...family, emergency_contact_relation: e.target.value })} options={["Father","Mother","Brother","Other"]} />
            <Input label="Emergency Number" value={family.emergency_contact_number} onChange={e => setFamily({ ...family, emergency_contact_number: e.target.value })} />
          </div>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <div style={styles.form}>
           <Select
      label="Department"
      value={work.departmentName}
      onChange={e => setWork({ ...work, departmentName: e.target.value })}
      options={["Java", "Web", "Mobile App", "DIGITAL MARKETING", "SALES"]}
    />
           <Select
      label="Designation"
      value={work.designation}
      onChange={e => setWork({ ...work, designation: e.target.value })}
      options={[
        "Intern",
        "Trainee",
        "Software Developer",
        "Senior Software Engineer",
        "Team Lead",
        "Project Manager",
        "HR Manager",
        "Sales Executive",
        "Other"
      ]}
    />
            <Input label="Reporting Manager" value={work.reporting_manager} onChange={e => setWork({ ...work, reporting_manager: e.target.value })} />
            <Input label="Employment Type" value={work.employment_type} onChange={e => setWork({ ...work, employment_type: e.target.value })} />
            <Input label="Work Location" value={work.work_location} onChange={e => setWork({ ...work, work_location: e.target.value })} />
            <Input label="Shift Timing" value={work.shift_timing} onChange={e => setWork({ ...work, shift_timing: e.target.value })} />
            <Input label="Work Mode" value={work.work_mode} onChange={e => setWork({ ...work, work_mode: e.target.value })} />
            <Input label="Salary" value={work.salary} onChange={e => setWork({ ...work, salary: e.target.value })} />
          </div>
        )}

        {/* STEP 4 */}
        {step === 4 && (
          <div style={styles.form}>
            <Input label="Username" value={auth.userName} onChange={e => setAuth({ ...auth, userName: e.target.value })} />
            <Input type="password" label="Password" value={auth.password} onChange={e => setAuth({ ...auth, password: e.target.value })} />
            <Input label="Role" value="EMPLOYEE" disabled />

             <Select
      label="Role"
      value={auth.role}
      onChange={e => setAuth({ ...auth, role: e.target.value })}
      options={["EMPLOYEE"]}
    />
          </div>
        )}

        {/* ACTIONS */}
        <div style={styles.actions}>
          {step > 1 && <button style={styles.secondary} onClick={() => setStep(step - 1)}>Back</button>}
          {step < 4 && <button style={styles.primary} onClick={() => setStep(step + 1)}>Next</button>}
          {step === 4 && <button style={styles.success} onClick={handleFinalSubmit}>Submit</button>}
        </div>
      </div>
    </div>
  );
}

/* ================= COMPONENTS ================= */

const Input = ({ label, type="text", value, onChange, disabled }) => (
  <div style={styles.field}>
    <label>{label}</label>
    <input type={type} value={value} disabled={disabled} onChange={onChange} style={styles.input} />
  </div>
);

const Select = ({ label, value, onChange, options }) => (
  <div style={styles.field}>
    <label>{label}</label>
    <select value={value} onChange={onChange} style={styles.input}>
      <option value="">Select</option>
      {options.map(o => <option key={o} value={o}>{o}</option>)}
    </select>
  </div>
);

/* ================= STYLES ================= */

const styles = {
  wrapper: {
    display: "flex",
    justifyContent: "center",
    padding: 40,
    background: "#f3f4f6"
  },
  card: {
    width: 800,
    background: "#fff",
    padding: 30,
    borderRadius: 12,
    boxShadow: "0 15px 30px rgba(0,0,0,.1)"
  },
  title: {
    textAlign: "center",
    marginBottom: 20
  },
  steps: {
    display: "flex",
    marginBottom: 25
  },
  step: {
    flex: 1,
    padding: 10,
    background: "#e5e7eb",
    textAlign: "center",
    borderRadius: 6
  },
  stepActive: {
    flex: 1,
    padding: 10,
    background: "#2563eb",
    color: "#fff",
    textAlign: "center",
    borderRadius: 6
  },
  form: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 15
  },
  field: {
    display: "flex",
    flexDirection: "column"
  },
  input: {
    padding: 8,
    borderRadius: 6,
    border: "1px solid #ccc"
  },
  actions: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: 30
  },
  primary: {
    background: "#2563eb",
    color: "#fff",
    padding: "10px 20px",
    border: "none",
    borderRadius: 6
  },
  secondary: {
    background: "#6b7280",
    color: "#fff",
    padding: "10px 20px",
    border: "none",
    borderRadius: 6
  },
  success: {
    background: "#16a34a",
    color: "#fff",
    padding: "10px 20px",
    border: "none",
    borderRadius: 6
  }
};
