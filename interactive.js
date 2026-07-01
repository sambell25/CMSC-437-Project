const serviceTabs = [
    { id: "safety", label: "Safety" },
    { id: "announcements", label: "Announcements" },
    { id: "attendant", label: "Attendant" },
    { id: "phone", label: "Phone Call" },
    { id: "feedback", label: "Feedback" },
];

function getInitialServiceTab() {
    const hashTab = window.location.hash.replace("#", "");
    return serviceTabs.some((tab) => tab.id === hashTab) ? hashTab : "safety";
}

const announcements = [
    {
        type: "Pilot",
        time: "10:42 AM",
        title: "Smooth Cruise",
        body: "We are cruising at 36,000 feet and expect an on-time arrival into London Heathrow.",
    },
    {
        type: "Flight Attendant",
        time: "10:55 AM",
        title: "Cabin Service",
        body: "Meal and beverage service will begin shortly. Please keep aisles clear while carts are moving.",
    },
    {
        type: "Connection Desk",
        time: "11:18 AM",
        title: "Arrival Reminder",
        body: "Gate and baggage information will appear in the flight dashboard as we get closer to arrival.",
    },
];

const safetyItems = [
    {
        title: "Exit Locations",
        body: "Nearest exits from this cabin zone are forward left and rear right. Floor lighting will guide passengers during low visibility.",
    },
    {
        title: "Seat Belt Guidance",
        body: "Keep your seat belt fastened whenever seated, even when the seat belt sign is off.",
    },
    {
        title: "Emergency Procedures",
        body: "Follow crew instructions, leave carry-on bags behind, and use the closest available exit during an evacuation.",
    },
];

function SectionHeader({ eyebrow, title, children }) {
    return (
        <section
            className="dashboard-hero hero-image shadow-sm"
            style={{
                backgroundImage:
                    "linear-gradient(135deg, rgba(16, 35, 63, 0.84), rgba(13, 110, 253, 0.48)), url('https://images.unsplash.com/photo-1540339832862-474599807836?w=1600&h=700&fit=crop')",
            }}
        >
            <div>
                <p className="eyebrow">{eyebrow}</p>
                <h1>{title}</h1>
                <p>{children}</p>
            </div>
            <div className="flight-status badge text-bg-success">
                <span className="status-dot"></span>
                Seat 14C
            </div>
        </section>
    );
}

function AnnouncementsTab() {
    return (
        <section className="row g-3 mx-auto" style={{ maxWidth: "1180px" }} aria-label="Flight announcements">
            {announcements.map((announcement) => (
                <div className="col-12 col-lg-4" key={announcement.title}>
                    <article className="card panel p-0 h-100 border-0 shadow-sm">
                        <div className="card-body">
                            <div className="d-flex justify-content-between align-items-start gap-3 mb-2">
                                <h2 className="h5 fw-bold mb-0">{announcement.title}</h2>
                                <time className="text-muted small">{announcement.time}</time>
                            </div>
                            <span className="badge text-bg-primary mb-3">{announcement.type}</span>
                            <p className="card-text text-muted mb-0">{announcement.body}</p>
                        </div>
                    </article>
                </div>
            ))}
        </section>
    );
}

function FlightSeatMap() {
    const rows = Array.from({ length: 14 }, (_, index) => index + 1);
    const seats = [
        { letter: "A", x: 54 },
        { letter: "B", x: 82 },
        { letter: "C", x: 110 },
        { letter: "D", x: 190 },
        { letter: "E", x: 218 },
        { letter: "F", x: 246 },
    ];
    const exitRows = [2, 13];

    return (
        <article className="card panel p-0 border-0 shadow-sm">
            <div className="card-body">
                <div className="d-flex flex-column flex-md-row justify-content-between gap-2 mb-3">
                    <div>
                        <h2 className="h5 fw-bold mb-1">Cabin Seating Map</h2>
                        <p className="text-muted mb-0">
                            Exit rows and cabin doors are highlighted for quick reference.
                        </p>
                    </div>
                    <span className="badge text-bg-warning align-self-start">Exits highlighted</span>
                </div>

                <div className="bg-light border rounded-3 p-3">
                    <svg
                        className="img-fluid w-100"
                        viewBox="0 0 320 700"
                        role="img"
                        aria-labelledby="seatMapTitle seatMapDescription"
                    >
                        <title id="seatMapTitle">Cabin Seating Map With Exit Locations</title>
                        <desc id="seatMapDescription">
                            Aircraft cabin map showing fourteen seat rows, seat letters A through F, a center
                            aisle, highlighted exit rows, emergency exits, and passenger seat 14C.
                        </desc>
                        <path
                            d="M160 14 C91 14 38 70 38 142 L38 574 C38 636 92 686 160 686 C228 686 282 636 282 574 L282 142 C282 70 229 14 160 14 Z"
                            fill="#ffffff"
                            stroke="#c8d3df"
                            strokeWidth="4"
                        />
                        <path d="M93 50 C123 29 197 29 227 50" fill="none" stroke="#d9e2ef" strokeWidth="4" />
                        <rect x="139" y="70" width="42" height="520" rx="18" fill="#eaf2ff" />
                        <text x="160" y="52" textAnchor="middle" fill="#667085" fontSize="12" fontWeight="700">
                            FRONT
                        </text>
                        <text x="160" y="75" textAnchor="middle" fill="#667085" fontSize="10" fontWeight="700">
                            AISLE ROW
                        </text>
                        {seats.map((seat) => (
                            <text
                                key={seat.letter}
                                x={seat.x + 10}
                                y="98"
                                textAnchor="middle"
                                fill="#667085"
                                fontSize="9"
                                fontWeight="800"
                            >
                                {seat.letter}
                            </text>
                        ))}

                        {rows.map((row, rowIndex) => {
                            const y = 106 + rowIndex * 34;
                            const isExitRow = exitRows.includes(row);
                            return (
                                <g key={row}>
                                    {isExitRow && (
                                        <rect
                                            x="48"
                                            y={y - 4}
                                            width="224"
                                            height="34"
                                            rx="10"
                                            fill="#fff3cd"
                                            stroke="#ffc107"
                                            strokeWidth="2"
                                        />
                                    )}
                                    <text x="160" y={y + 18} textAnchor="middle" fill="#667085" fontSize="10" fontWeight="700">
                                        {row}
                                    </text>
                                    {seats.map((seat) => {
                                        const isPassengerSeat = row === 14 && seat.letter === "C";
                                        return (
                                            <g key={`${row}${seat.letter}`}>
                                                <rect
                                                    x={seat.x}
                                                    y={y}
                                                    width="20"
                                                    height="24"
                                                    rx="6"
                                                    fill={isPassengerSeat ? "#d1e7dd" : isExitRow ? "#ffe69c" : "#f7fbff"}
                                                    stroke={isPassengerSeat ? "#198754" : isExitRow ? "#d39e00" : "#9fb0c2"}
                                                    strokeWidth={isPassengerSeat ? "2.5" : "1.5"}
                                                />
                                                <text
                                                    x={seat.x + 10}
                                                    y={y + 16}
                                                    textAnchor="middle"
                                                    fill={isPassengerSeat ? "#0f5132" : "#667085"}
                                                    fontSize="8"
                                                    fontWeight="800"
                                                >
                                                    {seat.letter}
                                                </text>
                                            </g>
                                        );
                                    })}
                                </g>
                            );
                        })}

                        <g>
                            <rect x="20" y="156" width="54" height="30" rx="8" fill="#dc3545" />
                            <rect x="246" y="156" width="54" height="30" rx="8" fill="#dc3545" />
                            <rect x="20" y="530" width="54" height="30" rx="8" fill="#dc3545" />
                            <rect x="246" y="530" width="54" height="30" rx="8" fill="#dc3545" />
                            <text x="47" y="176" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="800">EXIT</text>
                            <text x="273" y="176" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="800">EXIT</text>
                            <text x="47" y="550" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="800">EXIT</text>
                            <text x="273" y="550" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="800">EXIT</text>
                        </g>

                        <path d="M76 171 H118" stroke="#dc3545" strokeWidth="3" strokeDasharray="5 5" />
                        <path d="M202 171 H244" stroke="#dc3545" strokeWidth="3" strokeDasharray="5 5" />
                        <path d="M76 545 H118" stroke="#dc3545" strokeWidth="3" strokeDasharray="5 5" />
                        <path d="M202 545 H244" stroke="#dc3545" strokeWidth="3" strokeDasharray="5 5" />
                        <g transform="translate(28 630)">
                            <rect x="0" y="0" width="14" height="14" rx="4" fill="#ffe69c" stroke="#d39e00" />
                            <text x="22" y="12" fill="#667085" fontSize="12">Exit row</text>
                            <rect x="98" y="0" width="24" height="14" rx="4" fill="#dc3545" />
                            <text x="130" y="12" fill="#667085" fontSize="12">Cabin exit</text>
                            <rect x="212" y="0" width="14" height="14" rx="4" fill="#d1e7dd" stroke="#198754" />
                            <text x="234" y="12" fill="#667085" fontSize="12">Your seat</text>
                        </g>
                    </svg>
                </div>
            </div>
        </article>
    );
}

function SafetyTab() {
    return (
        <section className="row g-3 mx-auto" style={{ maxWidth: "1180px" }} aria-label="Safety information">
            <div className="col-12 col-xl-7">
                <FlightSeatMap />
            </div>
            <div className="col-12 col-xl-5">
                <article className="card panel p-0 h-100 border-0 shadow-sm">
                    <div className="card-body">
                        <div className="d-flex justify-content-between align-items-start gap-3 mb-2">
                            <h2 className="h5 fw-bold mb-0">Quick Safety Checklist</h2>
                            <span className="badge text-bg-success">Always available</span>
                        </div>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item px-0">Review the seatback safety card before landing.</li>
                            <li className="list-group-item px-0">Keep bags fully under the seat in front of you.</li>
                            <li className="list-group-item px-0">Put phones and loose items away during taxi, takeoff, and landing.</li>
                        </ul>
                    </div>
                </article>
            </div>
            {safetyItems.map((item) => (
                <div className="col-12 col-lg-4" key={item.title}>
                    <article className="card panel p-0 h-100 border-0 shadow-sm">
                        <div className="card-body">
                            <h2 className="h5 fw-bold">{item.title}</h2>
                            <p className="card-text text-muted mb-0">{item.body}</p>
                        </div>
                    </article>
                </div>
            ))}
        </section>
    );
}

function AttendantTab() {
    const [requestStatus, setRequestStatus] = React.useState("Ready");
    const [requestType, setRequestType] = React.useState("General assistance");

    function requestAttendant() {
        setRequestStatus("Cabin crew notified");
    }

    return (
        <section className="row g-3 mx-auto" style={{ maxWidth: "1180px" }} aria-label="Call flight attendant">
            <div className="col-12 col-lg-8">
                <article className="card panel p-0 border-0 shadow-sm">
                    <div className="card-body">
                <div className="d-flex justify-content-between align-items-start gap-3 mb-2">
                    <h2 className="h5 fw-bold mb-0">Request Cabin Crew Assistance</h2>
                    <span className="badge text-bg-info">{requestStatus}</span>
                </div>
                <p className="text-muted">
                    Choose the type of help you need and send a request to the cabin crew system.
                    A crew member will respond when available.
                </p>
                <label className="form-label fw-bold" htmlFor="requestType">Request type</label>
                <select
                    className="form-select"
                    id="requestType"
                    value={requestType}
                    onChange={(event) => setRequestType(event.target.value)}
                >
                    <option>General assistance</option>
                    <option>Water or beverage</option>
                    <option>Medical concern</option>
                    <option>Seat or cabin issue</option>
                </select>
                <button className="btn btn-primary fw-bold mt-3" type="button" onClick={requestAttendant}>
                    Call Attendant
                </button>
                {requestStatus !== "Ready" && (
                    <div className="alert alert-success mt-3 mb-0" role="status">
                        Request sent: {requestType}. Your seat indicator has been added to the crew queue.
                    </div>
                )}
                    </div>
                </article>
            </div>
        </section>
    );
}

function PhoneTab() {
    const [phoneNumber, setPhoneNumber] = React.useState("");
    const [payment, setPayment] = React.useState({ name: "", card: "", expiry: "", cvv: "" });
    const [errors, setErrors] = React.useState({});
    const [confirmed, setConfirmed] = React.useState(false);
    const callFee = 4.99;

    function validatePhoneCheckout() {
        const newErrors = {};
        if (!phoneNumber.trim()) {
            newErrors.phone = "Required";
        }
        if (!payment.name.trim()) {
            newErrors.name = "Required";
        }
        if (!/^\d{16}$/.test(payment.card.replace(/\s/g, ""))) {
            newErrors.card = "Enter a valid 16-digit number";
        }
        if (!/^\d{2}\/\d{2}$/.test(payment.expiry)) {
            newErrors.expiry = "MM/YY format";
        }
        if (!/^\d{3,4}$/.test(payment.cvv)) {
            newErrors.cvv = "3-4 digits";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    function handleCardInput(event) {
        const digits = event.target.value.replace(/\D/g, "").slice(0, 16);
        const formatted = digits.replace(/(.{4})/g, "$1 ").trim();
        setPayment({ ...payment, card: formatted });
    }

    function handleExpiryInput(event) {
        let value = event.target.value.replace(/\D/g, "").slice(0, 4);
        if (value.length > 2) {
            value = value.slice(0, 2) + "/" + value.slice(2);
        }
        setPayment({ ...payment, expiry: value });
    }

    function handleCvvInput(event) {
        setPayment({ ...payment, cvv: event.target.value.replace(/\D/g, "").slice(0, 4) });
    }

    function confirmPhonePurchase() {
        if (validatePhoneCheckout()) {
            setConfirmed(true);
        }
    }

    function resetPhoneCheckout() {
        setPhoneNumber("");
        setPayment({ name: "", card: "", expiry: "", cvv: "" });
        setErrors({});
        setConfirmed(false);
    }

    if (confirmed) {
        return (
            <div className="order-confirmed-wrap">
                <div className="panel shadow-sm confirmed-panel">
                    <div className="confirmed-icon">✓</div>
                    <h1>Call Ready</h1>
                    <p className="confirmed-sub">
                        Payment was approved. Your in-flight phone session is ready to connect.
                    </p>

                    <div className="confirmed-receipt">
                        <div className="panel-heading">
                            <h2>Phone Call Receipt</h2>
                            <span>Paid</span>
                        </div>
                        <div className="receipt-row">
                            <span>Phone number</span>
                            <strong>{phoneNumber}</strong>
                        </div>
                        <div className="receipt-row muted">
                            <span>Connection fee</span>
                            <span>${callFee.toFixed(2)}</span>
                        </div>
                        <div className="receipt-row total-row">
                            <span>Total</span>
                            <strong>${callFee.toFixed(2)}</strong>
                        </div>
                    </div>

                    <button className="primary-button" type="button" onClick={resetPhoneCheckout}>
                        Start Another Call
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="checkout-grid" aria-label="Paid phone call checkout">
            <div className="panel shadow-sm">
                <div className="panel-heading">
                    <h2>Phone Call Setup</h2>
                    <span>${callFee.toFixed(2)}</span>
                </div>

                <p className="payment-footnote" style={{ marginTop: 0 }}>
                    Enter the number you want to call, then complete payment to start a simulated
                    in-flight phone session.
                </p>

                <label className="field-label">Phone Number</label>
                <input
                    className={errors.phone ? "field-input field-error" : "field-input"}
                    placeholder="Phone number"
                    value={phoneNumber}
                    onChange={(event) => {
                        setPhoneNumber(event.target.value);
                        setConfirmed(false);
                    }}
                />
                {errors.phone && <p className="error-text">{errors.phone}</p>}

                <div className="security-note">
                    This purchase covers one short in-flight phone session.
                </div>

                <div style={{ marginTop: 16 }}>
                    <div className="receipt-row">
                        <span>Satellite phone session</span>
                        <strong>${callFee.toFixed(2)}</strong>
                    </div>
                    <div className="receipt-row muted">
                        <span>Cabin network access</span>
                        <span>Included</span>
                    </div>
                    <div className="receipt-row total-row">
                        <span>Total</span>
                        <strong>${callFee.toFixed(2)}</strong>
                    </div>
                </div>
            </div>

            <div className="panel shadow-sm">
                <div className="panel-heading">
                    <h2>Payment Information</h2>
                </div>

                <label className="field-label">Cardholder Name</label>
                <input
                    className={errors.name ? "field-input field-error" : "field-input"}
                    placeholder="Cardholder name"
                    value={payment.name}
                    onChange={(event) => setPayment({ ...payment, name: event.target.value })}
                />
                {errors.name && <p className="error-text">{errors.name}</p>}

                <label className="field-label">Card Number</label>
                <input
                    className={errors.card ? "field-input field-error" : "field-input"}
                    placeholder="4242 4242 4242 4242"
                    value={payment.card}
                    maxLength={19}
                    onChange={handleCardInput}
                />
                {errors.card && <p className="error-text">{errors.card}</p>}

                <div className="field-row">
                    <div>
                        <label className="field-label">Expiry</label>
                        <input
                            className={errors.expiry ? "field-input field-error" : "field-input"}
                            placeholder="MM/YY"
                            value={payment.expiry}
                            maxLength={5}
                            onChange={handleExpiryInput}
                        />
                        {errors.expiry && <p className="error-text">{errors.expiry}</p>}
                    </div>
                    <div>
                        <label className="field-label">CVV</label>
                        <input
                            className={errors.cvv ? "field-input field-error" : "field-input"}
                            placeholder="..."
                            value={payment.cvv}
                            maxLength={4}
                            onChange={handleCvvInput}
                        />
                        {errors.cvv && <p className="error-text">{errors.cvv}</p>}
                    </div>
                </div>

                <button className="primary-button confirm-btn" type="button" onClick={confirmPhonePurchase}>
                    Confirm Purchase - ${callFee.toFixed(2)}
                </button>
                <button className="secondary-button cancel-btn" type="button" onClick={resetPhoneCheckout}>
                    Cancel
                </button>

                <p className="payment-footnote">
                    After payment, the call service will become available from this Services tab.
                </p>
            </div>
        </div>
    );
}

function FeedbackTab() {
    const [message, setMessage] = React.useState("");
    const [submitted, setSubmitted] = React.useState(false);

    function submitFeedback(event) {
        event.preventDefault();
        setSubmitted(true);
    }

    return (
        <section className="row g-3 mx-auto" style={{ maxWidth: "1180px" }} aria-label="Feedback and issue report">
            <div className="col-12 col-lg-8">
                <article className="card panel p-0 border-0 shadow-sm">
                    <div className="card-body">
                <div className="d-flex justify-content-between align-items-start gap-3 mb-2">
                    <h2 className="h5 fw-bold mb-0">Feedback And Issue Report</h2>
                    <span className={`badge ${submitted ? "text-bg-success" : "text-bg-secondary"}`}>
                        {submitted ? "Submitted" : "Open"}
                    </span>
                </div>
                <p className="text-muted">
                    Send comments, service feedback, or cabin issue reports to the airline team for
                    follow-up after the flight.
                </p>
                <form onSubmit={submitFeedback}>
                    <label className="form-label fw-bold" htmlFor="feedbackMessage">Message</label>
                    <textarea
                        className="form-control"
                        id="feedbackMessage"
                        placeholder="Tell us what happened or how we can improve."
                        rows="5"
                        value={message}
                        onChange={(event) => {
                            setMessage(event.target.value);
                            setSubmitted(false);
                        }}
                        required
                    ></textarea>
                    <button className="btn btn-primary fw-bold mt-3" type="submit">
                        Submit Feedback
                    </button>
                </form>
                {submitted && (
                    <div className="alert alert-success mt-3 mb-0" role="status">
                        Feedback recorded. Thank you for helping improve the SkyLink experience.
                    </div>
                )}
                    </div>
                </article>
            </div>
        </section>
    );
}

function ActiveServicePanel({ activeTab }) {
    if (activeTab === "safety") {
        return <SafetyTab />;
    }
    if (activeTab === "attendant") {
        return <AttendantTab />;
    }
    if (activeTab === "phone") {
        return <PhoneTab />;
    }
    if (activeTab === "feedback") {
        return <FeedbackTab />;
    }
    return <AnnouncementsTab />;
}

function InteractivePage() {
    const [activeTab, setActiveTab] = React.useState(getInitialServiceTab);

    function changeTab(tabId) {
        setActiveTab(tabId);
        window.history.replaceState(null, "", `#${tabId}`);
    }

    return (
        <div className="app-shell">
            <SimpleNav active="Services" />
            <main className="dashboard container-fluid">
                <SectionHeader eyebrow="Passenger Services" title="Onboard Help And Communication">
                    View crew announcements, safety information, cabin assistance, paid phone calls,
                    and feedback tools from one service center.
                </SectionHeader>
                <SubTabs
                    tabs={serviceTabs}
                    active={activeTab}
                    onChange={changeTab}
                    ariaLabel="Passenger service sections"
                />
                <ActiveServicePanel activeTab={activeTab} />
            </main>
        </div>
    );
}
