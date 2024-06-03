export var RouteExecutionStatus;
(function (RouteExecutionStatus) {
    RouteExecutionStatus[RouteExecutionStatus["Idle"] = 0] = "Idle";
    RouteExecutionStatus[RouteExecutionStatus["Pending"] = 1] = "Pending";
    RouteExecutionStatus[RouteExecutionStatus["Done"] = 2] = "Done";
    RouteExecutionStatus[RouteExecutionStatus["Failed"] = 4] = "Failed";
    RouteExecutionStatus[RouteExecutionStatus["Partial"] = 8] = "Partial";
    RouteExecutionStatus[RouteExecutionStatus["Refunded"] = 16] = "Refunded";
})(RouteExecutionStatus || (RouteExecutionStatus = {}));
//# sourceMappingURL=types.js.map