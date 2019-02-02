import {$log} from "ts-log-debug";
$log.level = "debug";
$log.name = "APP";

export const log = $log

$log.debug("Some debug messages");
