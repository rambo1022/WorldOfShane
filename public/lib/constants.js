const incidentStatus = {
    denied: -1,
    pendingSuggestion: 0,
    pendingReview: 1,
    approved: 2
};

const incidentSuggestion = {
    CanApprove: "Can Approve",
    ShouldDeny: "Should Deny",
    None: "None"
};

export { incidentStatus, incidentSuggestion };