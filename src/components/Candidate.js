import { useEffect, useState } from "react";
import AddCandidate from "./AddCandidate";
import EditCandidate from "./EditCandidate";
import { useDispatch } from "react-redux";
import { fetchCandidates } from "../store/features/candidateSlice";
import axios from "axios";
import Profile from "./Profile";

export default function Candidate() {
  //? Custom bir list tanımlandı, normalde backend tarafından liste gelecek.

  const dispatch = useDispatch();
  const [candidates, setCandidates] = useState([]);
  const [profile, setProfile] = useState({});

  const getCandidates = () => {
    dispatch(fetchCandidates()).then((data) => setCandidates(data.payload));
  };

  const updateCandidates = (id) => {
    let tempCandidate = JSON.stringify({});

    tempCandidate = candidates.find((element) => element.oid === id);
    console.log("Temp", tempCandidate);
    axios
      .put("http://localhost:8081/api/v1/candidate/update", tempCandidate, {
        headers: { "Content-Type": "application/json" },
      })
      .then(() => alert("Güncellendi"));
  };
  const deleteCandidate = (id) => {
    axios
      .delete("http://localhost:8081/api/v1/candidate/delete/" + id)
      .then(() => alert("Silindi"));
  };

  useEffect(() => {
    getCandidates();
  }, []);

  const [updateState, setUpdateState] = useState(-1); //* Default değeri -1.

  const handleProfile = (candidate) => {
    setProfile(candidate);
  };
  let order = 1;
  return (
    <div className="container">
      <div className="jumbotron">
        <div className="card">
          <div className="card-header">Candidate Case</div>
          <div className="card-body">
            <button
              type="button"
              className="btn btn-primary mb-3"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              Yeni Aday
            </button>
            <div
              className="modal fade"
              id="exampleModal"
              tabIndex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog modal-lg">
                <div className="modal-content">
                  <div className="modal-header">Aday Ekle</div>
                  <div className="modal-body">
                    <AddCandidate setCandidates={setCandidates} />
                  </div>
                </div>
              </div>
            </div>

            <form onSubmit={handleUpdate}>
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Ad</th>
                    <th scope="col">Soyad</th>
                    <th scope="col">Mail</th>
                    <th scope="col">Telefon</th>
                    <th scope="col">Durum</th>
                    <th scope="col">İşlemler</th>
                  </tr>
                </thead>
                <tbody>
                  {candidates &&
                    candidates.map((candidate) =>
        
                      updateState === candidate.oid ? (
                        <EditCandidate
                          candidate={candidate}
                          candidates={candidates}
                          setCandidates={setCandidates}
                        />
                      ) : (
                        <tr key={candidate.oid}>
                          <th scope="row">{order++}</th>
                          <td className="col-md-2">{candidate.name}</td>
                          <td className="col-md-2">{candidate.surname}</td>
                          <td className="col-md-2">{candidate.mail}</td>
                          <td className="col-md-2">{candidate.phone}</td>
                          <td className="col-md-2">{candidate.status}</td>

                          <td>
                            <button
                              type="button"
                              onClick={() => handleProfile(candidate)}
                              className="btn btn-primary"
                              data-bs-toggle="modal"
                              data-bs-target="#profileModal"
                            >
                              <i className="far fa-eye"></i>
                            </button>
                            <div
                              className="modal fade"
                              id="profileModal"
                              tabIndex="-1"
                              aria-labelledby="profileModalLabel"
                              aria-hidden="true"
                            >
                              <div className="modal-dialog modal-lg">
                                <div className="modal-content">
                                  <div className="modal-header">Profil</div>
                                  <div className="modal-body">
                                    <Profile profile={profile} />
                                  </div>
                                </div>
                              </div>
                            </div>

                            <button
                              className="btn btn-success  "
                              type="button"
                              onClick={() => handleEdit(candidate.oid)}
                            >
                              <i className="fas fa-edit"></i>
                            </button>
                            <button
                              className="btn btn-danger"
                              type="button"
                              onClick={() => handleDelete(candidate.oid)}
                            >
                              <i className="far fa-trash-alt"></i>
                            </button>
                          </td>
                        </tr>
                      )
                    )}
                </tbody>
              </table>
            </form>
          </div>
        </div>
      </div>
    </div>
  );

  function handleUpdate(e) {
    e.preventDefault();
    setUpdateState(-1);
    updateCandidates(updateState);
  }

  function handleEdit(id) {
    //* id setUpdateState'e gönderilir.
    setUpdateState(id);
  }

  function handleDelete(id) {
    const newList = candidates.filter((candidate) => candidate.oid !== id);
    setCandidates(newList);
    console.log("id", id);
    deleteCandidate(id);
  }
}
