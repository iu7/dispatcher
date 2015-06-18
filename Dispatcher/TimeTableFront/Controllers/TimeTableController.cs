using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace TimeTableFront.Models
{
    public class TimeTableFrontController : Controller
    {
        //
        // GET: /TimeTable/

        public ActionResult Index()
        {
            return View();
        }
        public ActionResult Passengers()
        {
            var t = new FlightModel();
            return View(new List<FlightInfo>[]{t.GetArrival(), t.GetDeparture()});
        }
        public ActionResult Signin()
        {
            return View();
        }
        public ActionResult Login()
        {
            return View();
        }
        public ActionResult Runway()
        {
            var t = new FlightModel();
            var lst = t.GetArrival();
            lst.AddRange(t.GetDeparture());
            lst.Sort(delegate(FlightInfo x, FlightInfo y)
            {
                if (x.Time == null && y.Time == null) return 0;
                else if (x.Time == null) return -1;
                else if (y.Time == null) return 1;
                else return x.Time.CompareTo(y.Time);
            });
            return View(lst);
        }
        public ActionResult Newflight()
        {
            return View();
        }
    }
}
