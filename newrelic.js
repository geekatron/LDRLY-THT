/**
 * Created with WebStorm.
 * Date: 2/3/2014
 * Time: 2:52 AM
 * @author Adam C. Nowak
 * @description
 */

/**
 * New Relic agent configuration.
 *
 * See lib/config.defaults.js in the agent distribution for a more complete
 * description of configuration variables and their potential values.
 */
exports.config = {
    /**
     * Array of application names.
     */
    app_name : ['LDRLY Leaderboard'],
    /**
     * Your New Relic license key.
     */
    license_key : 'a9bac79c448b7b2efa13a86351773c25529d094a',
    logging : {
        /**
         * Level at which to log. 'trace' is most useful to New Relic when diagnosing
         * issues with the agent, 'info' and higher will impose the least overhead on
         * production applications.
         */
        level : 'trace'
    }
};

