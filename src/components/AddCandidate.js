import axios from "axios";
import { useState } from "react";

function AddCandidate({ setCandidates }) {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [mail, setMail] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState("");

  const formAlert = () => {
    alert("Lütfen boş alan bırakmayınız!");
  };
  const createNewCandidate = (payload) => {
    let tempCandidate = JSON.stringify({
      name: payload.name,
      surname: payload.surname,
      phone: payload.phone,
      mail: payload.mail,
      status: payload.status,
    });

    axios
      .post("http://localhost:8081/api/v1/candidate/create", tempCandidate, {
        headers: { "Content-Type": "application/json" },
      })
      .then(() => alert("Eklendi"));
  };

  function handleSubmit(event) {
    event.preventDefault(); //? Submit işleminden sonra sayfanın yenilenmesini önlemek için kullanıldı.

    const newCandidate = {
      name: name,
      surname: surname,
      mail: mail,
      phone: phone,
      status: status,
    };
    createNewCandidate(newCandidate);

    setCandidates((prevList) => {
      return [...prevList, newCandidate];
    });
    console.log(newCandidate, "new candidate");
  }

  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="form-row">
          <div className="form-group col-md-6">
            <input
              className="form-control"
              type="text"
              name="name"
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder="Ad giriniz."
              onInvalid={formAlert}
              required
            />
          </div>
          <div className="form-group col-md-6">
            <input
              className="form-control"
              type="text"
              name="surname"
              onChange={(e) => setSurname(e.target.value)}
              value={surname}
              placeholder="Soyad giriniz."
              onInvalid={formAlert}
              required
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <input
              className="form-control"
              type="tel"
              name="phone"
              onChange={(e) => setPhone(e.target.value)}
              value={phone}
              placeholder="Telefon giriniz."
              onInvalid={formAlert}
              required
            />
          </div>
          <div className="form-group col-md-6">
            <input
              className="form-control"
              type="email"
              name="mail"
              onChange={(e) => setMail(e.target.value)}
              value={mail}
              placeholder="Mail giriniz."
              onInvalid={formAlert}
              required
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <select
              name="status"
              className="select form-control"
              onChange={(e) => setStatus(e.target.value)}
              value={status}
              onInvalid={formAlert}
              required
            >
              <option value="-1">Choose one</option>
              <option value="SOURCED">Sourced</option>
              <option value="INTERVIEWING">Interviewing</option>
              <option value="OFFER_SENT">Offer Sent</option>
              <option value="HIRED">Hired</option>
            </select>
          </div>
        </div>

        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            className="btn btn-primary"
          >
            Save changes
          </button>
        </div>
      </form>
    </>
  );
}

export default AddCandidate;
