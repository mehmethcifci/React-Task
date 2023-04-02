import React, { useState } from "react";

function EditCandidate({ candidate, candidates, setCandidates }) {
  const formAlert = () => {
    alert("Lütfen boş alan bırakmayınız!");
  };
  const [emailError, setEmailError] = useState('')

  function handleInput(e) {
    const newData = candidates.map((x) =>
      x.oid === candidate.oid ? { ...x, [e.target.name]: e.target.value } : x
    );
    setCandidates(newData);
  }
  
  return (
    <tr>
      <th scope="row" key={candidate.oid}>{candidate.oid}</th>
      <td>
        <input
          type="text"
          className="form-control"
          name="name"
          value={candidate.name}
          onChange={handleInput}
          onInvalid={formAlert}
          required
        />
      </td>
      <td>
        <input
          type="text"
          className="form-control"
          name="surname"
          value={candidate.surname}
          onChange={handleInput}
          onInvalid={formAlert}
          required
        />
      </td>
      <td>
        <input
          type="mail"
          className="form-control"
          name="mail"
          value={candidate.mail}
          onChange={handleInput}
          onInvalid={formAlert}
          required
        /><span style={{
          fontWeight: 'bold',
          color: 'red',
          }}>{emailError}</span>
      </td>
      <td>
        <input
          type="tel"
          name="phone"
          className="form-control"
          value={candidate.phone}
          onChange={handleInput}
          onInvalid={formAlert}
          required
        />
      </td>
      <td>
        <select
          name="status"
          className="select form-control"
          onChange={(e) => handleInput(e)}
          value={candidate.status}
          onInvalid={formAlert}
          required
        >
          <option value="-1">Choose one</option>
          <option value="SOURCED">Sourced</option>
          <option value="INTERVIEWING">Interviewing</option>
          <option value="OFFER_SENT">Offer Sent</option>
          <option value="HIRED">Hired</option>
        </select>
      </td>
      <td>
        <button type="submit" className="btn btn-success">
          Güncelle
        </button>
      </td>
    </tr>
  );
}

export default EditCandidate;
