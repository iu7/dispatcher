using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace weather.Controllers
{
    public class WeatherController : ApiController
    {
        // GET api/weather
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/weather?date=15.03.2014 05:00:00&icao=KJFK&lang=rus&format=object
        //UUDD 151700Z 01004MPS CAVOK 03/M08 Q1044 32010095 82010095 NOSIG
        public Object Get(string date, string icao, string lang, string format)
        {
            var Connector = new DatabaseConnector();
            if (icao == null || icao == "UUEE")
            {
                var result = Connector.CurrentWeather(Convert.ToDateTime(date));
                if (format == "object")
                {
                    Connector.Decode(result, lang);
                    return result;
                }
                else if (format == "metar")
                {
                    return Connector.METARtostring(result);
                }
            }
            else
            {
                var result = Connector.AbroadWeather(icao);
                if (format == "object")
                {
                    Connector.Decode(result, lang);
                    return result;
                }
                else if (format == "metar")
                {
                    return Connector.METARtostring(result);
                }
            }
            throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.NoContent)
            {
                Content = new StringContent("No content: errors in parameters or call"),
                ReasonPhrase = "Critical Exception"
            });
        }

    }
}
