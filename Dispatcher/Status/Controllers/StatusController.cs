using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Status.Controllers
{
    public enum FlightStatus
    {
        Ожидается,
        НачалоРегистрации,
        ЗавершениеРегистрации,
        НаРулежнойДорожке,
        НазначенВзлетныйКурс,
        ВылетРазрешен,
        Отправлен,
        ВылетОжидается,
        ПосадкаОжидается,
        Задержан,
        Отменен,
        ПосадкаРазрешена,
        Прибыл
    }

    public class StatusController : ApiController
    {
        private Models.TimeTableEntities db = new Models.TimeTableEntities();
        // PUT api/status/5
        public void Put(Guid id, FlightStatus status)
        {    
            //var js = Request.Content.ReadAsStringAsync().Result;
            //var status = (new System.Web.Script.Serialization.JavaScriptSerializer()).Deserialize<FlightStatus>(js.ToString());
            var flight = new Models.Status(); flight.FlightID = id; flight.Status1 = (int)status;
            db.Entry(flight).State = System.Data.EntityState.Modified;
            db.SaveChanges();
        }
    }
}
