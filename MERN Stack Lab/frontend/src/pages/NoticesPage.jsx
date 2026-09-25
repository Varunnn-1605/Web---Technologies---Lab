import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Bell, PlusCircle, ChevronRight } from 'lucide-react';

// ─────────────────────────────────────────────────────────────────────────────
// NoticesPage — Class Component (follows the assignment algorithm)
//
// Algorithm:
//  Step 1 : Component mounts
//  Step 2 : State initialized — notices[], newTitle, newBody
//  Step 3 : componentDidMount — GET /api/notices (fetch from MongoDB)
//  Step 4 : Handle response — update notices state
//  Step 5-6: handleInputChange — update newTitle / newBody as user types
//  Step 7-8: handleSubmit — validate, build notice object
//  Step 9 : POST /api/notices — send to Express → MongoDB
//  Step 10: Update state with returned notice, reset form
//  Step 11: Render UI — list + form
//  Step 12: Map through notices array to display each item
// ─────────────────────────────────────────────────────────────────────────────

class NoticesPage extends Component {
  // Step 2: Initialize state
  constructor(props) {
    super(props);
    this.state = {
      notices: [],       // array to store notices from MongoDB
      newTitle: '',      // string for new notice title input
      newBody: '',       // string for new notice body input
      loading: true,
      error: null,
      submitting: false,
    };

    // Bind methods
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // Step 3: Fetch existing notices from MongoDB via Express API
  componentDidMount() {
    fetch('/api/notices')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch notices');
        return res.json();
      })
      // Step 4: Update notices state with retrieved data
      .then((data) => {
        this.setState({ notices: data, loading: false });
      })
      .catch((err) => {
        this.setState({ error: err.message, loading: false });
      });
  }

  // Steps 5-6: Handle input changes — update the respective state field
  handleInputChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  // Steps 7-10: Handle form submission
  handleSubmit(event) {
    event.preventDefault();

    const { newTitle, newBody } = this.state;

    // Step 7: Check if inputs are empty — return if so
    if (!newTitle.trim() || !newBody.trim()) {
      alert('Please fill in both the title and description.');
      return;
    }

    // Step 8: Create a new notice object
    const noticeObject = {
      title: newTitle.trim(),
      body: newBody.trim(),
    };

    this.setState({ submitting: true });

    // Step 9: POST request to Express server → saves to MongoDB
    fetch('/api/notices', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(noticeObject),
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to add notice');
        return res.json();
      })
      // Step 10: Update state with newly added notice, reset input fields
      .then((savedNotice) => {
        this.setState((prevState) => ({
          notices: [savedNotice, ...prevState.notices], // prepend so newest is first
          newTitle: '',
          newBody: '',
          submitting: false,
        }));
      })
      .catch((err) => {
        alert('Error: ' + err.message);
        this.setState({ submitting: false });
      });
  }

  // Step 11: Render the UI
  render() {
    const { notices, newTitle, newBody, loading, error, submitting } = this.state;

    return (
      <div className="page-wrapper">
        {/* Page Hero */}
        <section className="page-hero">
          <div className="container hero-content">
            <div className="breadcrumbs">
              <Link to="/">Home</Link>
              <ChevronRight size={14} />
              <span className="current-crumb">Notices</span>
            </div>
            <h1>
              <Bell size={28} style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} />
              University Notices
            </h1>
            <p className="hero-description">
              Official announcements, circulars, and updates from Apex University Administration.
            </p>
          </div>
        </section>

        <section className="page-main-content">
          <div className="container notices-layout">

            {/* ── Left: Notices List (Step 12: map through notices[]) ── */}
            <div className="notices-list-section">
              <h2 className="section-heading">All Notices</h2>

              {loading && <p className="notices-loading">Fetching notices from database...</p>}
              {error && <p className="notices-error">⚠ {error} — Is the backend running?</p>}

              {!loading && !error && notices.length === 0 && (
                <p className="notices-loading">No notices yet. Be the first to add one!</p>
              )}

              {/* Step 12: Map through notices array */}
              {notices.map((notice) => (
                <div key={notice._id} className="notice-card">
                  <div className="notice-card-header">
                    <h3>{notice.title}</h3>
                    <span className="notice-date">
                      {new Date(notice.date).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                  <p>{notice.body}</p>
                </div>
              ))}
            </div>

            {/* ── Right: Add Notice Form (Task Form component logic) ── */}
            <div className="notices-form-section">
              <div className="notice-form-card">
                <h3>
                  <PlusCircle size={20} style={{ marginRight: '0.4rem', verticalAlign: 'middle' }} />
                  Post a New Notice
                </h3>
                <p className="form-subtext">Notices are saved to MongoDB and persist across sessions.</p>

                <form onSubmit={this.handleSubmit} className="notice-form">
                  <div className="form-group">
                    <label htmlFor="newTitle">Notice Title</label>
                    <input
                      id="newTitle"
                      type="text"
                      name="newTitle"
                      value={newTitle}
                      onChange={this.handleInputChange}
                      placeholder="e.g. Exam Schedule Released"
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="newBody">Description</label>
                    <textarea
                      id="newBody"
                      name="newBody"
                      value={newBody}
                      onChange={this.handleInputChange}
                      placeholder="Enter the full notice details here..."
                      rows={5}
                      className="form-input form-textarea"
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-primary notice-submit-btn"
                    disabled={submitting}
                  >
                    {submitting ? 'Posting...' : 'Post Notice'}
                  </button>
                </form>
              </div>
            </div>

          </div>
        </section>
      </div>
    );
  }
}

export default NoticesPage;
