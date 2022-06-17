import * as cron from 'node-cron';
// schedule tasks to be run on the server
export const scheduleCronJobs = () => {
    cron.schedule('* * * * *', () => {
      console.log('Cron job in every min')
    });
};
