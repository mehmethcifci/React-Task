import React from "react";

export default function Profile({ profile }) {
  return (
    <>
      <form>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label>İsim</label>
            <label className="form-control" type="text" name="name">
              {profile.name}
            </label>
          </div>
          <div className="form-group col-md-6">
            <label>Soyisim</label>
            <label className="form-control" type="text" name="surname">
              {profile.surname}
            </label>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label>Mail</label>
            <label className="form-control" type="email" name="mail">
              {profile.mail}
            </label>
          </div>
          <div className="form-group col-md-6">
            <label>Telefon</label>
            <label className="form-control" type="tel" name="phone">
              {profile.phone}
            </label>
          </div>
        </div>{" "}
        <div className="form-row">
          <div className="form-group col-md-6">
            <label>Durum</label>
            <label className="form-control" type="text" name="status">
              {profile.status}
            </label>
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
        </div>
      </form>
    </>
  );
}
