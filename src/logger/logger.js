"use strict";
exports.__esModule = true;
var ts_log_debug_1 = require("ts-log-debug");
ts_log_debug_1.$log.level = "debug";
ts_log_debug_1.$log.name = "APP";
exports.log = ts_log_debug_1.$log;
ts_log_debug_1.$log.debug("Some debug messages");
