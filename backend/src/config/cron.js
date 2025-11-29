import cron from "cron" ;
import https from "https" ;

const job  = new cron.CronJob("*/14****"  , function(){
    https.
        get( process.env.API_URL , (res) =>{
            if(res.statusCode === 200) console.log("Request sent successfully") ;
            else console.log("Request failed" , res.statusCode) ;
        }

        )
        .on( "error" , (e) => console.error("Error while sending request" , e)) ;
}) ;

/* 
CRON JOB EXPLAINATION

Cron jobs are scheduled tasks that run periodically at fixed interval 
we want to send one request every 14 minutes so that our api never gets inactive on render.com

How to define schedule 
you define a schedule using a cron expression which consists of 5 fields representing

// MINUTE , HOUR , DAY OF THE MONTH ,  MONTH  , DAY OF THE WEEK



*/