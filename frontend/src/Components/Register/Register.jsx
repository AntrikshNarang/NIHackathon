import React, { useEffect, useState } from "react";
import styles from "./Register.module.css";

const Register = ({ User }) => {
  const [Option, setOption] = useState("joinTeam");
  const [Teams, setTeams] = useState([]);
  const [ErrorMsg, setErrorMsg] = useState(null);
  const [Credentials, setCredentials] = useState({
    college: "",
    contact: "",

    teamName: "",
    teamDescription: "",
  });
  async function getTeams() {
    const response = await fetch("http://localhost:5000/api/teams/getTeams", {
      method: "GET",
    });
    const json = await response.json();
    if (json.success) {
      setTeams(json.teams);
    } else {
      setErrorMsg(json.error);
    }
  }
  useEffect(() => {
    getTeams();
  }, []);

  function handleChange(e) {
    setOption(e.target.value);
  }
  async function createTeam(e) {
    e.preventDefault();
    if (
      Credentials.college.length === 0 ||
      Credentials.contact.length === 0 ||
      Credentials.teamDescription.length === 0 ||
      Credentials.teamName.length === 0
    ) {
      setErrorMsg("Please fill all the fields");
    }
    const response = await fetch("http://localhost:5000/api/teams/createTeam", {
      method: "POST",
      body: JSON.stringify({
        college: Credentials.college,
        phone: Credentials.contact,
        teamName: Credentials.teamName,
        description: Credentials.teamDescription,
      }),
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    if (json.success) {
      console.log("TCS");
      setErrorMsg("Team Created Successfully");
    } else {
      setErrorMsg(json.error);
      console.log(json.error);
    }
  }
  async function joinTeam(e, index) {
    e.preventDefault();
    console.log(index);
    if (Credentials.college.length === 0 || Credentials.contact.length === 0) {
      setErrorMsg("Please fill all the fields");
    }
    const response = await fetch("http://localhost:5000/api/teams/joinTeam", {
      method: "POST",
      body: JSON.stringify({
        college: Credentials.college,
        phone: Credentials.contact,
        teamId: Teams[index]?._id,
      }),
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    if (json.success) {
      console.log("TCS");
      setErrorMsg("Team Joined Successfully");
    } else {
      setErrorMsg(json.error);
      console.log(json.error);
    }
  }
  return (
    <>
      <div className={styles.mainDiv}>
        <div className={styles.handleRadio}>
          <input
            type="radio"
            className="btn-check"
            name="options-outlined"
            id="success-outlined"
            value="createTeam"
            autoComplete="off"
            checked={Option === "createTeam"}
            onChange={handleChange}
          />
          <label className="btn btn-outline-light" htmlFor="success-outlined">
            Create Team
          </label>
          <input
            type="radio"
            className="btn-check"
            name="options-outlined"
            id="danger-outlined"
            autoComplete="off"
            value="joinTeam"
            checked={Option === "joinTeam"}
            onChange={handleChange}
          />
          <label className="btn btn-outline-light" htmlFor="danger-outlined">
            Join Team
          </label>
        </div>
        <h1>{Option === "joinTeam" ? "Select a Team" : "Create a Team"}</h1>
        {ErrorMsg && <p className={styles.errorMsg}>{ErrorMsg}</p>}
        <form className={styles.authForm}>
          <div className="form-floating mb-3">
            <input
              onChange={(e) =>
                setCredentials((prev) => ({ ...prev, college: e.target.value }))
              }
              type="text"
              value={Credentials.college}
              className="form-control bg-dark"
              id="floatingCollege"
              placeholder="NIE Mysore"
            />
            <label htmlFor="floatingCollege">College</label>
          </div>
          <div className="form-floating mb-3">
            <input
              onChange={(e) =>
                setCredentials((prev) => ({ ...prev, contact: e.target.value }))
              }
              type="tel"
              value={Credentials.contact}
              className="form-control bg-dark"
              id="floatingPhone"
              placeholder="9876543210"
            />
            <label htmlFor="floatingPhone">Phone</label>
          </div>
          {Option === "createTeam" ? (
            <>
              <div className="form-floating mb-3">
                <input
                  onChange={(e) =>
                    setCredentials((prev) => ({
                      ...prev,
                      teamName: e.target.value,
                    }))
                  }
                  type="text"
                  value={Credentials.teamName}
                  className="form-control bg-dark"
                  id="floatingTeam"
                  placeholder="The Conquerors"
                />
                <label htmlFor="floatingTeam">Team Name</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  onChange={(e) =>
                    setCredentials((prev) => ({
                      ...prev,
                      teamDescription: e.target.value,
                    }))
                  }
                  type="text"
                  value={Credentials.teamDescription}
                  className="form-control bg-dark"
                  id="floatingDes"
                  placeholder="Description"
                />
                <label htmlFor="floatingDes">Description</label>
              </div>
              <button className={`btn btn-light ${styles.btn}`} onClick={createTeam}>
                Form a Team
              </button>
            </>
          ) : (
            <>
              <h1>Available Teams:</h1>
              <div className={styles.cards}>
                {Teams.map((team, index) => {
                  return (
                    <div key={index} className="card">
                      <div className="card-body bg-dark">
                        <h5 className="card-title text-light">
                          Team: {team?.name}
                        </h5>
                        <h6 className="card-subtitle mb-2 text-secondary">
                          Leader: {team?.members[0]?.name}
                        </h6>
                        <p className="card-text">{team?.teamDescription}</p>
                        <p className="card-text">
                          <small className="text-secondary">
                            Member Count:{team?.memberCount}/3
                          </small>
                        </p>
                        <button
                          className="btn btn-sm btn-light"
                          onClick={(e) => joinTeam(e, index)}
                        >
                          Join Team!
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </form>
      </div>
    </>
  );
};

export default Register;
