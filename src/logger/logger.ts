import {$log} from "ts-log-debug";
$log.level = "debug";
$log.name = "APP";

export {$log as log}

$log.debug("Some debug messages");
