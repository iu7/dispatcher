using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace timetable.Controllers
{
    public class TimeTableController : ApiController
    {
        private Models.TimeTableEntities db = new Models.TimeTableEntities();
        private Models.TimeTableEntities1 dbSt = new Models.TimeTableEntities1();

        public Object Get()
        {
            var flights = db.Flights.ToList();
            var shortflights = new List<Flight>();
            foreach (var f in flights)
            {
                var status = (FlightStatus)dbSt.Status.Find(f.FlightID).Status1;
                var sf = new Flight(f, db, status);
                shortflights.Add(sf);
            }
            var js = (new System.Web.Script.Serialization.JavaScriptSerializer()).Serialize(shortflights);
            var msg = new HttpResponseMessage();
            msg.Content = new StringContent(js, System.Text.Encoding.UTF8);
            return msg;
        }

        // GET api/values/5
        public Object Get(string what, string date)
        {
            var day = Convert.ToDateTime(date);
            string js; HttpResponseMessage msg;
            switch (what)
            {
                case "ports": // ports
                    var ports = new List<String>();
                    foreach (var p in db.Airports)
                        ports.Add(p.Title);
                    js = (new System.Web.Script.Serialization.JavaScriptSerializer()).Serialize(ports);
                    msg = new HttpResponseMessage();
                    msg.Content = new StringContent(js, System.Text.Encoding.UTF8);
                    return msg;
                case "planes": // airplanes
                    var planes = new List<String>();
                    foreach (var p in db.Airplanes)
                        planes.Add(p.AirplaneType);
                    js = (new System.Web.Script.Serialization.JavaScriptSerializer()).Serialize(planes);
                    msg = new HttpResponseMessage();
                    msg.Content = new StringContent(js, System.Text.Encoding.UTF8);
                    return msg;
                case "arrival":
                    //var flights = db.Flights.Where(f => f.ArrivalTime.Day == DateTime.Today.Day && f.ArrivalTime.Month == DateTime.Today.Month && f.Destination == 1).ToList();
                    var flights = db.Flights.Where(f => f.ArrivalTime.Day == day.Day && f.ArrivalTime.Month == day.Month && f.Destination == 1).ToList();
                    var shortf = new List<Flight>();
                    foreach (var f in flights)
                    {
                        var status = (FlightStatus)dbSt.Status.Find(f.FlightID).Status1;
                        shortf.Add(new Flight(f, db, status));
                    }
                    js = (new System.Web.Script.Serialization.JavaScriptSerializer()).Serialize(shortf);
                    msg = new HttpResponseMessage();
                    msg.Content = new StringContent(js, System.Text.Encoding.UTF8);
                    return msg;
                case "departure":
                    //var flights1 = db.Flights.Where(f => f.Origin == 1 && f.DepartureTime.Month == DateTime.Today.Month && f.DepartureTime.Day == DateTime.Today.Day).ToList();
                    var flights1 = db.Flights.Where(f => f.Origin == 1 && f.DepartureTime.Month == day.Month && f.DepartureTime.Day == day.Day).ToList();
                    var shortf1 = new List<Flight>();
                    foreach (var f in flights1)
                    {
                        var status = (FlightStatus)dbSt.Status.Find(f.FlightID).Status1;
                        shortf1.Add(new Flight(f, db, status));
                    }
                    js = (new System.Web.Script.Serialization.JavaScriptSerializer()).Serialize(shortf1);
                    msg = new HttpResponseMessage();
                    msg.Content = new StringContent(js, System.Text.Encoding.UTF8);
                    return msg;
            }
            return "error";
        }

        public Object Get(string date)
        {
            //var day = Convert.ToDateTime(date);
            ///////////////////////////////////
            var day = new DateTime(2015, 6, 17);
            ///////////////////////////////////
            var dep = db.Flights.Where(f => f.Origin == 1 && f.DepartureTime.Month == day.Month && f.DepartureTime.Day == day.Day).ToList();
            var arr = db.Flights.Where(f => f.Destination == 1 && f.ArrivalTime.Month == day.Month && f.ArrivalTime.Day == day.Day).ToList();
            Sort(ref dep, 0); Sort(ref arr, 1);
            // create massive of all 5 min time slots
            var start = new DateTime(day.Year, day.Month, day.Day, 0, 0, 0);
            var slots = new List<DateTime>();
            var depi = 0; var arri = 0; int i = 0;
            var nextday = day.AddDays(1).Day;
            while (start.Day < nextday)
            {
                bool occupied = false;
                if (depi < dep.Count())
                {
                    if (dep[depi].DepartureTime.Hour == start.Hour && dep[depi].DepartureTime.Minute >= start.Minute && dep[depi].DepartureTime.Minute <= start.AddMinutes(5).Minute)
                    {
                        depi++;
                        occupied = true;
                    }
                }
                if (arri < arr.Count())
                {
                    if (arr[arri].ArrivalTime.Hour == start.Hour && arr[arri].ArrivalTime.Minute >= start.Minute && arr[arri].ArrivalTime.Minute <= start.AddMinutes(5).Minute)
                    {
                        arri++;
                        occupied = true;
                    }
                }
                i++;
                if (!occupied)
                    slots.Add(start);
                start = start.AddMinutes(5);
            }
            var js = (new System.Web.Script.Serialization.JavaScriptSerializer()).Serialize(slots);
            var msg = new HttpResponseMessage();
            msg.Content = new StringContent(js, System.Text.Encoding.UTF8);
            return msg;
        }

        public void Post()
        {
            var js = Request.Content.ReadAsStringAsync().Result;
            var flight = (new System.Web.Script.Serialization.JavaScriptSerializer()).Deserialize<Models.Flights>(js.ToString());
            db.Flights.Add(flight);
            db.SaveChanges();
        }

        private bool CompareDays (DateTime d1, DateTime d2)
        {
            if (d1.Year == d2.Year && d1.Month == d2.Month && d1.Day == d2.Day)
                return true;
            else
                return false;
        }

        private void Sort (ref List<Models.Flights> fs, int comparer)
        {
            Models.Flights temp;
            for (int i=0; i<fs.Count(); i++)
                for (int j=0; j<fs.Count(); j++)
                    if (comparer == 0)
                    {
                        if (fs[i].DepartureTime < fs[j].DepartureTime)
                        {
                            temp = fs[i]; fs[i] = fs[j]; fs[j] = temp;
                        }
                    }
                    else
                    {
                        if (fs[i].ArrivalTime < fs[j].ArrivalTime)
                        {
                            temp = fs[i]; fs[i] = fs[j]; fs[j] = temp;
                        }
                    }
                        
        }

    }
    
    // copied from Status.Controllers
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


    public class Flight
    {
        public Guid id;
        public DateTime Arrival;
        public DateTime Departure;
        public String Origin;
        public String Destination;
        public String Airplane;
        public String Number;
        public FlightStatus Status;

        public Flight (Models.Flights f, Models.TimeTableEntities db, FlightStatus st)
        {
            id = f.FlightID;
            Arrival = f.ArrivalTime;
            Departure = f.DepartureTime;
            Origin = db.Airports.Find(f.Origin).Title;
            Destination = db.Airports.Find(f.Destination).Title;
            Airplane = db.Airplanes.Find(f.AirplaneID).AirplaneType;
            Number = f.FlightNumber;
            Status = st;
        }
    }
}
