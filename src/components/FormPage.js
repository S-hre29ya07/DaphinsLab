import { useState } from 'react';
import './FormPage.css';
import  { Link } from "react-router-dom";
function FormPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="card">
      <div className="card-body">
        <h3 className="card-title">Enter your information</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <Link to={`/catalogue?name=${name}&email=${email}`}>
            <button type="submit" className="btn btn-primary">Submit</button>
        </Link>
      </form>
      </div>
    </div>
  );
}
export default FormPage