const userConstant = {
    EMAIL_VERIFIED_TRUE: 1,
    EMAIL_VERIFIED_FALSE: 0,
    STATUS_ACTIVE: 1,
    STATUS_INACTIVE: 0,
    STATUS_REMOVED: 2,
    ROLE_AGENCY_ADMIN: 1,
    ROLE_AGENCY_TEAM: 2, // USER
    DEFAULT_USER_YES: 1,
    DEFAULT_USER_NO: 0,
};
const gmbAccountConstant = {
    STATUS_ACTIVE: 1,
    STATUS_INACTIVE: 0,
};
const scanKeywordConstant = {
    STATUS_RUNNING: 1,
    STATUS_REMOVED: 0,
};
const scanScheduleConstant = {
    STATUS_QUEUED: 0,
    STATUS_PROCESSING: 1,
    STATUS_PROCESSED: 2,
    STATUS_FAILED: 3,
};
const scanResultConstant = {
    SELF_YES: 1,
    SELF_NO: 0,
};

const geoGridConstant = {
    SCHEDULE_TYPE_ALL: 0,
    SCHEDULE_TYPE_ONE_TIME: 1,
    SCHEDULE_TYPE_WEEKLY: 2,
    SCHEDULE_TYPE_MONTHLY: 3,
    RADIUS_TYPE_KM: 1,
    RADIUS_TYPE_MILE: 2,
    STATUS_QUEUED: 0,
    STATUS_PROCESSING: 1,
    STATUS_PROCESSED: 2,
    STATUS_FAILED: 3,
    STATUS_PAUSED: 4,
    STATUS_STOPPED: 5,
};

const geoGriApiAuthConstant = {
    TYPE_VALUESERP: 1,
    STATUS_ACTIVE: 1,
    STATUS_INACTIVE: 0,
};

export {
    userConstant,
    gmbAccountConstant,
    geoGridConstant,
    scanKeywordConstant,
    scanScheduleConstant,
    geoGriApiAuthConstant,
    scanResultConstant,
};
