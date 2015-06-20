using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.IO;
using System.Net;
using System.Text;
using System.Web.Script.Serialization;
using System.Text.RegularExpressions;
using System.Net.Http;
using System.Web.Http;

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
            //проверка, может куки уже есть
            var deserializedResult = CheckSession();
            var keyslist = deserializedResult.Keys.ToList();

            if (keyslist.Exists(p => p == "Error"))
            {
                return View(deserializedResult["Error"]);
            }
            else if (keyslist.Exists(p => p == "UserId"))
            {
                return View("Runway");
            }
            else
            {
                return View();
            }
        }
        public ActionResult LoginChecker()
        {
            string login = Request["txtLogin"].ToString();
            string password = Request["txtPassword"].ToString();

            WebRequest check_session = WebRequest.Create(@"http://localhost:43049/api/session");
            check_session.Headers.Add("Login", login);
            check_session.Headers.Add("Password", password);
            check_session.Method = "POST";
            string postData = "Hello session";
            byte[] byteArray = Encoding.UTF8.GetBytes(postData);
            check_session.ContentType = "application/x-www-form-urlencoded";
            check_session.ContentLength = byteArray.Length;
            Stream dataStream = check_session.GetRequestStream();
            dataStream.Write(byteArray, 0, byteArray.Length);
            dataStream.Close();

            WebResponse response = check_session.GetResponse();
            dataStream = response.GetResponseStream();
            StreamReader reader = new StreamReader(dataStream);
            string responseFromServer = reader.ReadToEnd();
            var serializer = new JavaScriptSerializer();

            //var serializedResult = serializer.Serialize(new List<string>{"sdfasdf", "asdfadfh"});
            var deserializedResult = serializer.Deserialize<Dictionary<string, string>>(responseFromServer);
            var keyslist = deserializedResult.Keys.ToList();

            if (keyslist.Exists(p => p == "Error"))
            {
                return View("AuthorizationError", (Object)deserializedResult["Error"]);
            }
            else
            {
                Response.Cookies["UserSettings"]["SessionId"] = deserializedResult["SessionId"].ToString();

                return View("LoginAuthorization", new List<string> { login, deserializedResult["SessionId"].ToString() });
            }
            return View();
        }
        public ActionResult Runway()
        {
            WebRequest request = WebRequest.Create(@"http://localhost:13847/api/timetable/?what=arrival&date=17.06.2015");
            request.Credentials = CredentialCache.DefaultCredentials;
            WebResponse response = request.GetResponse();
            Stream dataStream = response.GetResponseStream();
            StreamReader reader = new StreamReader(dataStream);
            string responseFromServer = reader.ReadToEnd();

            var serializer = new JavaScriptSerializer();
            var deserializedResult = serializer.Deserialize<HttpResponseMessage>(responseFromServer);
            

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
        public Dictionary<string, string> CheckSession()
        {
            string session_id = "";
            if (Request.Cookies["UserSettings"] != null)
            {

                if (Request.Cookies["UserSettings"]["SessionId"] != null)
                { session_id = Request.Cookies["UserSettings"]["SessionId"]; }
            }

            WebRequest request = WebRequest.Create(@"http://localhost:37709/api/users");
            request.Credentials = CredentialCache.DefaultCredentials;
            request.Headers.Add("sessionid", session_id);
            WebResponse response = request.GetResponse();
            Stream dataStream = response.GetResponseStream();
            StreamReader reader = new StreamReader(dataStream);
            string responseFromServer = reader.ReadToEnd();

            var serializer = new JavaScriptSerializer();
            var deserializedResult = serializer.Deserialize<Dictionary<string, string>>(responseFromServer);
            return deserializedResult;
        }
    }
}
